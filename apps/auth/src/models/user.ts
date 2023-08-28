import mongoose from 'mongoose';

import { Password } from '../services/password';

// Types
interface UserAttrs {
  email: string;
  password: string;
}
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/**
 * __Mongoose Schema for User__
 *
 * Required for Mongoose/TS interop
 * - schema using `mongoose#schema`
 * - `Attrs` interface for inputs
 * - `Doc` interface for mongoose Document properties +
 *    model fields + virtuals
 * - `Model` interface for mongoose Model properties + static method types
 * - `build` static method for creating new instance of Model with correct types
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // This really should be on a View and not on the Model
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

// Model Hooks
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.password);
    this.set("password", hashed);
  }

  done();
});

// Model Static Methods
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
