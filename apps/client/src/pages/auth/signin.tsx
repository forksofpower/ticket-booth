import React from "react";

import SignInUserForm from "@/components/forms/signin-user-form";
import AuthLayout from "@/components/layouts/auth-layout";

import { NextPageWithLayout } from "../_app";

const SigninPage: NextPageWithLayout = () => {
  return (
    <>
      <SignInUserForm />
    </>
  );
};
SigninPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
export default SigninPage;
