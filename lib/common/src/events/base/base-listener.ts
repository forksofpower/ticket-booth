import { Message, Stan } from "node-nats-streaming";

import { Subjects } from "../types/subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  protected client: Stan;
  protected ackWait = 5 * 1000;
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable() // deliver all events that have been emitted in the past
      .setManualAckMode(true) // manually acknowledge events
      .setAckWait(this.ackWait) // how long to wait before sending an ack
      .setDurableName(this.queueGroupName); // make sure that NATS doesn't delete the queue group if the service goes down
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8")); // support Buffer data
  }

  constructor(client: Stan) {
    this.client = client;
  }
}
