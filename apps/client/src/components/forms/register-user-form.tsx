"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { useRequest } from "@/hooks/use-request";
import { routes } from "@/routes";
import { normalizeErrorResponsesByField } from "@/utils/errors";

import { TextField } from "./fields/text-field";

export interface RegisterUserFormInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterUserForm = () => {
  const [errors, setErrors] = useState<FieldErrors<RegisterUserFormInput>>({});
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<RegisterUserFormInput>();

  const { doRequest: doUserRegisterRequest, errors: requestErrors } =
    useRequest<RegisterUserFormInput>({
      url: "/api/users/signup",
      method: "post",
      config: {
        headers: {
          "Content-Type": "application/json",
        },
      },
      onSuccess: () => {
        // redirect to home page on successful registration
        router.push(routes.root());
      },
    });
  useEffect(() => {
    setErrors(formErrors);
  }, [formErrors]);

  useEffect(() => {
    if (requestErrors) {
      setErrors(normalizeErrorResponsesByField(requestErrors));
    }
  }, [requestErrors]);

  // register form fields with validation rules
  const fullNameField = register("fullName", { required: "Name is required" });
  const emailField = register("email", {
    required: "Email is required",
    validate: (value) => {
      if (!value.includes("@")) {
        return "Email must be valid";
      }
    },
  });
  const passwordField = register("password", {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
    maxLength: {
      value: 32,
      message: "Password cannot be longer than 32 characters",
    },
  });
  const confirmPasswordField = register("confirmPassword", {
    required: "Password Confirmation is required",
    validate: (value) => {
      if (value !== watch("password")) {
        return "Passwords must match";
      }
    },
  });

  async function onSubmit({
    email,
    password,
    confirmPassword,
    fullName,
  }: RegisterUserFormInput) {
    const res = await doUserRegisterRequest({
      email,
      password,
      confirmPassword,
      fullName,
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        field="fullName"
        label="Full Name"
        error={errors.fullName}
        register={fullNameField}
      />
      <TextField
        field="email"
        label="Email Address"
        error={errors.email}
        register={emailField}
      />
      <TextField
        field="password"
        label="Password"
        type="password"
        error={errors.password}
        register={passwordField}
      />
      <TextField
        field="confirmPassword"
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword}
        register={confirmPasswordField}
      />

      <div className="pt-4">
        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterUserForm;
