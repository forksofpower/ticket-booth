"use client";
import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import useAuth from "@/hooks/use-auth";
import { normalizeErrorResponsesByField } from "@/utils/errors";

import { TextField } from "./fields/text-field";

export interface SignInUserFormInput {
  email: string;
  password: string;
}

export interface SignInUserFormProps {}

export const SignInUserForm: React.FC<SignInUserFormProps> = () => {
  const [errors, setErrors] = useState<FieldErrors<SignInUserFormInput>>({});
  const { signIn, signInErrors: requestErrors } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignInUserFormInput>();

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
  });

  async function onSubmit({ email, password }: SignInUserFormInput) {
    await signIn({
      email,
      password,
    });
  }

  return (
    <form className="space-y-4">
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
      <div className="form-control">
        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignInUserForm;
