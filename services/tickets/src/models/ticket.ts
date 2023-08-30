import mongoose from "mongoose";

// Types
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

/**
 * __Mongoose Schema for Ticket__
 *
 * Required for Mongoose/TS interop
 * - schema using `mongoose#schema`
 * - `Attrs` interface for inputs
 * - `Doc` interface for mongoose Document properties +
 *    model fields + virtuals
 * - `Model` interface for mongoose Model properties + static method types
 * - `build` static method for creating new instance of Model with correct types
 */
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
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
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

export const Ticket = mongoose.model<TicketDoc, TicketModel>(
  "Ticket",
  ticketSchema
);
