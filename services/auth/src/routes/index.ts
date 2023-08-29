import { currentUserRouter } from "./current-user";
import { signinRouter } from "./signin";
import { signoutRouter } from "./signout";
import { signupRouter } from "./signup";

export const routes = [
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
];
