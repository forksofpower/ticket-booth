"use client";
import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { TextField } from "./fields/text-field";

export interface SignInUserFormInput {
  email: string;
  password: string;
}

export interface SignInUserFormProps {
  fieldErrors: FieldErrors<SignInUserFormInput>;
  onSubmit: (input: SignInUserFormInput) => Promise<void> | void;
}

export const SignInUserForm: React.FC<SignInUserFormProps> = ({
  onSubmit,
  fieldErrors,
}) => {
  const [errors, setErrors] = useState<FieldErrors<SignInUserFormInput>>({});
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignInUserFormInput>();

  // TODO: Merge external fieldErrors and fieldErrors??
  useEffect(() => {
    setErrors(formErrors);
  }, [formErrors]);

  // Replace form errors with external fieldErrors
  useEffect(() => {
    if (fieldErrors) {
      setErrors(fieldErrors);
    }
  }, [fieldErrors]);

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
