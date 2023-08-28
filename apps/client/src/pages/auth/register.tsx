import React from "react";

import { RegisterUserForm } from "@/components/forms/register-user-form";
import AuthLayout from "@/components/layouts/auth-layout";

import { NextPageWithLayout } from "../_app";

const RegisterPage: NextPageWithLayout = () => {
  return (
    <>
      <RegisterUserForm />
    </>
  );
};

RegisterPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default RegisterPage;
