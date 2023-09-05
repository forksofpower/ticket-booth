import { Message } from "node-nats-streaming";

/**
 * Publisher
 */
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

// /**
//  * Listener
//  */
// export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
//   readonly subject = Subjects.TicketUpdated;
//   queueGroupName = "payments-service";

//   onMessage(data: TicketUpdatedEventData, msg: Message): void {
//     console.log("Event Data:", {
//       id: data.id,
//       title: data.title,
//       price: data.price,
//     });

//     // successful message
//     msg.ack();
//   }
// }
