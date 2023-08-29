"use client";
import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import useAuth from "@/hooks/use-auth";
import { normalizeErrorResponsesByField } from "@/utils/errors";

import { TextField } from "./fields/text-field";

export interface RegisterUserFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterUserForm = () => {
  const [errors, setErrors] = useState<FieldErrors<RegisterUserFormInput>>({});
  const { register: registerUser, registerErrors: requestErrors } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<RegisterUserFormInput>();

  async function onSubmit({
    email,
    password,
    confirmPassword,
  }: RegisterUserFormInput) {
    await registerUser({
      email,
      password,
      confirmPassword,
    });
  }

  useEffect(() => {
    setErrors(formErrors);
  }, [formErrors]);

  useEffect(() => {
    if (requestErrors) {
      setErrors(normalizeErrorResponsesByField(requestErrors));
    }
  }, [requestErrors]);

  // register form fields with validation rules
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

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)} autoComplete="false">
      <TextField
        field="email"
        placeholder="Email Address"
        error={errors.email}
        register={emailField}
      />
      <TextField
        field="password"
        placeholder="Password"
        type="password"
        error={errors.password}
        register={passwordField}
      />
      <TextField
        field="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        error={errors.confirmPassword}
        register={confirmPasswordField}
      />

      <div className="form-control pt-3">
        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterUserForm;
