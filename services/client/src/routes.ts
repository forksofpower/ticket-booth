export const routes = {
  root: () => "/",
  auth: {
    signin: withRedirect("/signin"),
    register: withRedirect("/register"),
    signout: withRedirect("/signout"),
  },
  tickets: {
    new: () => "/tickets/new",
    list: () => "/tickets",
    show: (ticketId: string) => `/tickets/${ticketId}`,
  },
  orders: {
    show: (orderId: string) => `/orders/${orderId}`,
  },
};

function withRedirect(path: string) {
  return function (redirectTo?: string) {
    return `${path}${redirectTo ? "?redirectTo=" + redirectTo : ""}`;
  };
}
