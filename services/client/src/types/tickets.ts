export interface Ticket {
  id: string;
  title: string;
  price: number;
  userId: string;
  version: number;
}

export type TicketCreateResponse = Ticket;
export type TicketListResponse = Ticket[];
export type TicketShowResponse = Ticket;
export type TicketUpdateResponse = Ticket;
