import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

import { OrderStatus } from "@forksofpower/ticketbooth-common";

import { TicketDoc } from "./ticket";

export { OrderStatus };

// Types
interface OrderAttrs {
  userId: string;
  expiresAt: Date;
  status: OrderStatus;
  ticket: TicketDoc;
}
export interface OrderDoc extends mongoose.Document {
  userId: string;
  expiresAt: Date;
  status: OrderStatus;
  ticket: TicketDoc;
  version: number;
}
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

// Schema
const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    userId: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  },
  {
    // This really should be on a View and not on the Model
    toJSON: {
      // istanbul ignore next
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);
// Enable OCC
orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

// Model Static Methods
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

export const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);
