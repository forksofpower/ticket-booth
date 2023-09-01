import mongoose from "mongoose";

// Types
interface OrderAttrs {
  userId: string;
  expiresAt: Date;
  status: string;
  ticket: TicketDoc;
}
interface OrderDoc extends mongoose.Document {
  userId: string;
  expiresAt: Date;
  status: string;
  ticket: TicketDoc;
}
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

/**
 * __Mongoose Schema for Order__
 *
 * Required for Mongoose/TS interop
 * - schema using `mongoose#schema`
 * - `Attrs` interface for inputs
 * - `Doc` interface for mongoose Document properties +
 *    model fields + virtuals
 * - `Model` interface for mongoose Model properties + static method types
 * - `build` static method for creating new instance of Model with correct types
 */
const orderSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
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
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

// Model Static Methods
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

export const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);
