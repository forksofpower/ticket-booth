"use client";
import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import useAuth from "@/hooks/use-auth";
import { normalizeErrorResponsesByField } from "@/utils/errors";

import Input from "./input";
import Label, { LabelText } from "./label";

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
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-base-content mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign Up
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form autoComplete="false" className="space-y-0">
          <div className="form-control">
            <Label className="pb-1" title="Email" />
            <Input type="email" {...emailField} />
            <Label className="mt-1 min-h-[1rem] py-0">
              <LabelText className="text-error text-xs">
                {errors.email?.message}
              </LabelText>
            </Label>
          </div>
          <div className="form-control">
            <Label className="pb-1" title="Password" />
            <Input type="password" {...passwordField} />
            <Label className="mt-1 min-h-[1rem] py-0">
              <LabelText className="text-error text-xs">
                {errors.password?.message}
              </LabelText>
            </Label>
          </div>
          <div className="form-control">
            <Label className="pb-1" title="Confirm Password" />
            <Input type="password" {...confirmPasswordField} />
            <Label className="mt-1 min-h-[1rem] py-0">
              <LabelText className="text-error text-xs">
                {errors.confirmPassword?.message}
              </LabelText>
            </Label>
          </div>

          <div className="form-control pt-3">
            <button
              onClick={handleSubmit(onSubmit)}
              className="btn btn-primary"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterUserForm;
