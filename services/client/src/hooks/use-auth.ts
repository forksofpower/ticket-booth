import Router from "next/router";
import React from "react";

import { RegisterUserFormInput } from "@/components/forms/register-user-form";
import { SignInUserFormInput as UserSignInRequestBody } from "@/components/forms/signin-user-form";
import { useCurrentUser } from "@/contexts/current-user";
import { routes } from "@/routes";
import { User } from "@/types/user";

import { useRequest } from "./use-request";

const useAuth = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [isSignedIn, setIsSignedIn] = React.useState(currentUser !== null);

  const { doRequest: doRegister, errors: registerErrors } = useRequest<
    RegisterUserFormInput,
    User
  >({
    url: "/api/users/signup",
    method: "post",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
    },
    onSuccess: (user) => {
      if (user) setCurrentUser(user);
      Router.push(routes.root());
    },
  });

  const { doRequest: doSignIn, errors: signInErrors } = useRequest<
    UserSignInRequestBody,
    User
  >({
    url: "/api/users/signin",
    method: "post",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  const { doRequest: signOut } = useRequest({
    url: "/api/users/signout",
    method: "get",
    onSuccess: () => {
      setCurrentUser(null);
      setIsSignedIn(false);
      Router.push(routes.root());
    },
  });

  async function register(body: RegisterUserFormInput, redirectTo?: string) {
    const user = await doRegister(body);
    if (user) {
      setCurrentUser(user);
      setIsSignedIn(true);
    }
    Router.push(redirectTo || routes.root());
  }
  async function signIn(body: UserSignInRequestBody, redirectTo?: string) {
    const user = await doSignIn(body);
    if (user) {
      setCurrentUser(user);
      setIsSignedIn(true);
    }
    Router.push(redirectTo || routes.root());
  }

  return {
    signIn,
    signOut,
    register,
    isSignedIn,
    user: currentUser,
    signInErrors,
    registerErrors,
  };
};

export default useAuth;

// function withRedirectTo<T extends (...args: any[]) => any>(
//   fn: T,
//   redirectTo?: string
// ) {
//   return (...args: Parameters<T>): ReturnType<T> => {
//     return fn(...args, redirectTo);
//   };
// }
