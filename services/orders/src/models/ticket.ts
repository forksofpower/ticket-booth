import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

import { Order, OrderStatus } from "./order";

// Types
interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
}
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<TicketDoc | null>;
}

// Schema
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    // This really should be on a View and not on the Model
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
// Enable OCC
ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);
// Model Static Methods
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({ id: attrs.id, price: attrs.price, title: attrs.title });
};
ticketSchema.statics.findByEvent = (event) => {
  return Ticket.findOne({
    _id: event.id,
    // find previous version
    version: event.version - 1,
  });
};

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $nin: [OrderStatus.Cancelled],
    },
  });

  return !!existingOrder;
};

export const Ticket = mongoose.model<TicketDoc, TicketModel>(
  "Ticket",
  ticketSchema
);
