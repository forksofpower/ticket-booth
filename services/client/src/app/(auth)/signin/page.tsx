"use client";
import React from "react";

import SignInUserForm, {
  SignInUserFormInput,
} from "@/components/forms/signin-user-form";
import useAuth from "@/hooks/use-auth";
import { routes } from "@/routes";
import { normalizeErrorResponsesByField } from "@/utils/errors";

export default function SigninPage() {
  const { signIn, signInErrors: responseErrors } = useAuth();

  async function onSubmit(data: SignInUserFormInput) {
    await signIn(data, routes.tickets.new());
  }

  return (
    <>
      <SignInUserForm
        onSubmit={onSubmit}
        fieldErrors={normalizeErrorResponsesByField(responseErrors || [])}
      />
    </>
  );
}
