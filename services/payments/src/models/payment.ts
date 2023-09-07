import mongoose from "mongoose";

// import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderDoc } from "./order";

interface PaymentAttrs {
  order: OrderDoc;
  stripeId: string;
}

interface PaymentDoc extends mongoose.Document {
  order: OrderDoc;
  stripeId: string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {}

const paymentSchema = new mongoose.Schema(
  {
    order: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    stripeId: {
      required: true,
      type: String,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
// Enable OCC
// schema.set("versionKey", "version");
// schema.plugin(updateIfCurrentPlugin);

// Model Static Methods
paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

export const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  paymentSchema
);
