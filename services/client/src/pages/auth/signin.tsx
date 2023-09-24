import React from "react";

import SignInUserForm, { SignInUserFormInput } from "@/components/forms/signin-user-form";
import AuthLayout from "@/components/layouts/auth-layout";
import useAuth from "@/hooks/use-auth";
import { routes } from "@/routes";
import { normalizeErrorResponsesByField } from "@/utils/errors";

import { NextPageWithLayout } from "../_app";

const SigninPage: NextPageWithLayout = () => {
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
};
SigninPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
export default SigninPage;
