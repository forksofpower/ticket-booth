import { Message } from "node-nats-streaming";

import { Listener, Publisher } from "./base";
import { Subjects } from "./subjects";

/**
 * Event
 */
export interface TicketUpdatedEventData {
  id: string;
  title: string;
  price: number;
}
export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: TicketUpdatedEventData;
}

/**
 * Publisher
 */
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

/**
 * Listener
 */
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = "payments-service";

  onMessage(data: TicketUpdatedEventData, msg: Message): void {
    console.log("Event Data:", {
      id: data.id,
      title: data.title,
      price: data.price,
    });

    // successful message
    msg.ack();
  }
}
