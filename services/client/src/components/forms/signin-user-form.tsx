"use client";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGoogle, FaXTwitter } from "react-icons/fa6";

import cn from "@/utils/classnames";

import Icon, { Size } from "../icon";
import Input from "./input";
import Label, { LabelText } from "./label";

export interface SignInUserFormInput {
  email: string;
  password: string;
}

export interface SignInUserFormProps {
  fieldErrors: FieldErrors<SignInUserFormInput>;
  onSubmit: (input: SignInUserFormInput) => Promise<void> | void;
}

const socialIconStyles = [
  {
    icon: FaXTwitter,
    color: "bg-twitter",
    hoverColor: "hover:bg-twitter",
    link: "/auth/twitter",
  },
  {
    icon: FaGoogle,
    color: "bg-google",
    hoverColor: "hover:bg-google",
    link: "/auth/google",
  },
  {
    icon: FaGithub,
    color: "bg-github",
    hoverColor: "hover:bg-github",
    link: "/auth/github",
  },
  {
    icon: FaFacebookF,
    color: "bg-facebook",
    hoverColor: "hover:bg-facebook",
    link: "/auth/facebook",
  },
];

export const socialIconList = (
  size: Size,
  icons: {
    icon: FC<ComponentProps<"svg">>;
    color: string;
    hoverColor: string;
    link: string;
  }[]
) =>
  icons.map(({ icon: ListIcon, color, hoverColor, link }) => (
    <a
      key={link}
      href={link}
      className={cn(
        "btn btn-lg btn-square text-white transition-shadow hover:shadow-md",
        color,
        hoverColor
      )}
    >
      <Icon icon={ListIcon} size={size} />
    </a>
  ));
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
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-base-content mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div className="form-control">
            <Label className="pb-1" title="Email Address" />
            <Input type="email" {...emailField} />
            <Label className="mt-1 min-h-[1rem] py-0">
              <LabelText className="text-error text-xs">
                {errors.email?.message}
              </LabelText>
            </Label>
          </div>

          <div className="form-control">
            <Label className="pb-0" title="Password">
              <LabelText float="right">
                <a href="#" className="link-primary hover:text-primary">
                  Forgot Password?
                </a>
              </LabelText>
            </Label>
            <Input type="password" {...passwordField} />
            <Label className="mt-1 min-h-[1rem] py-0">
              <LabelText className="text-error text-xs">
                {errors.password?.message}
              </LabelText>
            </Label>
          </div>
          <div className="form-control">
            <button
              onClick={handleSubmit(onSubmit)}
              className="btn btn-primary"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className="my-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="divider text-base-content py-4">Or continue with</div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex w-full items-center justify-center space-x-4">
          {socialIconList("lg", socialIconStyles)}
        </div>
      </div>
    </>
  );
};

export default SignInUserForm;
