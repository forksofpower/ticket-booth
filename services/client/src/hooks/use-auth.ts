"use client";
import { useRouter } from "next/navigation";

import { RegisterUserFormInput } from "@/components/forms/register-user-form";
import { SignInUserFormInput as UserSignInRequestBody } from "@/components/forms/signin-user-form";
import { useCurrentUser } from "@/contexts/current-user";
import { routes } from "@/routes";
import { User } from "@/types/user";

import { useRequest } from "./use-request";

const useAuth = () => {
  const { currentUser, setCurrentUser, isSignedIn } = useCurrentUser();
  const router = useRouter();

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
      router.push(routes.root());
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

  const { doRequest: doSignOut } = useRequest({
    url: "/api/users/signout",
    method: "get",
  });

  async function signOut(redirectTo?: string) {
    await doSignOut();
    setCurrentUser(null);
    // setIsSignedIn(false);
    router.push(redirectTo || routes.root());
  }

  async function register(body: RegisterUserFormInput, redirectTo?: string) {
    const user = await doRegister(body);
    if (user) {
      setCurrentUser(user);
      // setIsSignedIn(true);
    }
    router.push(redirectTo || routes.root());
  }
  async function signIn(body: UserSignInRequestBody, redirectTo?: string) {
    const user = await doSignIn(body);
    if (user) {
      setCurrentUser(user);
      // setIsSignedIn(true);
    }
    router.push(redirectTo || routes.root());
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
