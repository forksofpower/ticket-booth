export const routes = {
  root: () => "/",
  // Auth
  auth: {
    signin: (redirectTo?: string) => `/signin?redirectTo=${redirectTo || "/"}`,
    register: (redirectTo?: string) =>
      `/register?redirectTo=${redirectTo || "/"}`,
  },
  // Tickets
  tickets: {
    new: () => "tickets/new",
    list: () => "tickets",
    show: (ticketId: string) => `tickets/${ticketId}`,
  },
};
