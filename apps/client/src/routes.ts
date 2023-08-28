export const routes = {
  root(): string {
    return "/";
  },
  signin(redirectTo?: string): string {
    return `/signin?redirectTo=${redirectTo || "/"}`;
  },
  register(redirectTo?: string): string {
    return `/register?redirectTo=${redirectTo || "/"}`;
  },
};
