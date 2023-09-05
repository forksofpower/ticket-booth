import { Message } from "node-nats-streaming";

import {
  DomainEvent,
  Listener,
  Publisher,
} from "@forksofpower/ticketbooth-common";
import { Subjects } from "@forksofpower/ticketbooth-common/build/events/subjects";

/**
 * Event
 */
export interface TicketCreatedEventData {
  id: string;
  title: string;
  price: number;
  userId: string;
}
export type TicketCreatedEvent = DomainEvent<
  Subjects.TicketCreated,
  TicketCreatedEventData
>;

/**
 * Publisher
 */
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

// /**
//  * Listener
//  */
// export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
//   readonly subject = Subjects.TicketCreated;
//   queueGroupName = "orders-service";

//   onMessage(data: TicketCreatedEventData, msg: Message): void {
//     console.log("Event Data:", {
//       id: data.id,
//       title: data.title,
//       price: data.price,
//     });

//     // successful message
//     msg.ack();
//   }
// }
