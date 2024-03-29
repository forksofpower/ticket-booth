"use client";
import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import useAuth from "@/hooks/use-auth";
import { normalizeErrorResponsesByField } from "@/utils/errors";

import Input from "../form-elements/input";
import Label, { LabelText } from "../form-elements/label";

export interface RegisterUserFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterUserFormProps {
  fieldErrors: FieldErrors<RegisterUserFormInput>;
  onSubmit: (input: RegisterUserFormInput) => Promise<void> | void;
}

export const RegisterUserForm: React.FC<RegisterUserFormProps> = ({
  fieldErrors,
  onSubmit,
}) => {
  const [errors, setErrors] = useState<FieldErrors<RegisterUserFormInput>>({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<RegisterUserFormInput>();

  useEffect(() => {
    setErrors(formErrors);
  }, [formErrors]);

  useEffect(() => {
    if (fieldErrors) {
      setErrors(fieldErrors);
    }
  }, [fieldErrors]);

  // register form fields with validation rules

  const firstNameField = register("firstName", {
    required: "First Name is required",
    minLength: {
      value: 2,
      message: "First Name must be at least 2 characters long",
    },
    maxLength: {
      value: 32,
      message: "First Name cannot be longer than 32 characters",
    },
  });
  const lastNameField = register("lastName", {
    required: "Last Name is required",
    minLength: {
      value: 2,
      message: "Last Name must be at least 2 characters long",
    },
    maxLength: {
      value: 32,
      message: "Last Name cannot be longer than 32 characters",
    },
  });
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
            <Label className="pb-1" title="First Name" />
            <Input type="text" {...firstNameField} />
            <Label className="mt-1 min-h-[1rem] py-0">
              <LabelText className="text-error text-xs">
                {errors.firstName?.message}
              </LabelText>
            </Label>
          </div>
          <div className="form-control">
            <Label className="pb-1" title="Last Name" />
            <Input type="text" {...lastNameField} />
            <Label className="mt-1 min-h-[1rem] py-0">
              <LabelText className="text-error text-xs">
                {errors.lastName?.message}
              </LabelText>
            </Label>
          </div>
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
