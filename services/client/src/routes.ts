import type { Route } from "next";

export const routes = {
  root: route("/"),
  // auth
  signin: withRedirect("/signin"),
  register: withRedirect("/register"),
  signout: withRedirect("/signout"),

  // tickets
  createTicket: route("/tickets/create"),
  listTickets: route("/tickets"),
  showTicket: (ticketId: string) => `/tickets/${ticketId}` as Route,

  // orders
  showOrder: (orderId: string) => `/orders/${orderId}` as Route,
};

function route(path: Route) {
  return function () {
    return path;
  };
}
function withRedirect(path: Route) {
  return function (redirectTo?: string): Route {
    return `${path}${redirectTo ? "?redirectTo=" + redirectTo : ""}` as Route;
  };
}
