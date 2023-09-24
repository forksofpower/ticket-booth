export const routes = {
  root: () => "/",
  // Auth
  auth: {
    signin: withRedirect("/signin"),
    register: withRedirect("/register"),
    signout: withRedirect("/signout"),
  },
  // Tickets
  tickets: {
    new: () => "/tickets/new",
    list: () => "/tickets",
    show: (ticketId: string) => `/tickets/${ticketId}`,
  },
};

function withRedirect(path: string) {
  return function (redirectTo?: string) {
    return `${path}${redirectTo ? "?redirectTo=" + redirectTo : ""}`;
  };
}
