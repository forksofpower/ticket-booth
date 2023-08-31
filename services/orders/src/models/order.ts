import mongoose from "mongoose";

// Types
interface OrderAttrs {
  userId: string;
}
interface OrderDoc extends mongoose.Document {
  userId: string;
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
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

export const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);
