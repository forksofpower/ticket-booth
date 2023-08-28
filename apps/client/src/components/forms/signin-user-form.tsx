"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { useRequest } from "@/hooks/use-request";
import { routes } from "@/routes";

import { TextField } from "./fields/text-field";

export interface SignInUserFormInput {
  email: string;
  password: string;
}

export interface SignInUserFormProps {
  // onSuccess: () => void;
}

export const SignInUserForm: React.FC<SignInUserFormProps> = () => {
  const [errors, setErrors] = useState<FieldErrors<SignInUserFormInput>>({});
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignInUserFormInput>();

  const { doRequest: doUserSignInRequest, errors: requestErrors } =
    useRequest<SignInUserFormInput>({
      url: "/api/users/signin",
      method: "post",
      config: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

  useEffect(() => {
    setErrors(formErrors);
  }, [formErrors]);

  useEffect(() => {
    if (requestErrors) {
      setErrors(
        requestErrors.reduce<FieldErrors>((acc, e) => {
          if (e.field) {
            acc[e.field as string] = {
              message: e.message,
              type: "validate",
            };
          }
          return acc;
        }, {})
      );
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
    const res = await doUserSignInRequest({
      email,
      password,
    });
    // TODO: find a better way to handle the success response
    if (res.id) {
      router.push(routes.root());
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
      <div className="pt-4">
        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignInUserForm;
