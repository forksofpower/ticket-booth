"use client";
import React from "react";

import {
  RegisterUserForm,
  RegisterUserFormInput,
} from "@/components/forms/register-user-form";
import useAuth from "@/hooks/use-auth";
import { normalizeErrorResponsesByField } from "@/utils/errors";

export default function RegisterPage() {
  const { register, registerErrors: responseErrors } = useAuth();

  async function onSubmit(data: RegisterUserFormInput) {
    console.log("register form data", data);
    await register(data);
  }

  return (
    <>
      <RegisterUserForm
        fieldErrors={normalizeErrorResponsesByField(responseErrors || [])}
        onSubmit={onSubmit}
      />
    </>
  );
}
