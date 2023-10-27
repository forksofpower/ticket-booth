import mongoose, { MongooseError } from "mongoose";

import { Password } from "@/services/password";

const PASSWORD_HISTORY_LENGTH = 5;

export enum UserModelErrors {
  PasswordUsedBefore = "password-used-before",
  PasswordMatchesCurrent = "password-matches-current",
}

// Types
interface UserAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  passwordHistory?: string[];
}
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    fullName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordHistory: [String],
  },
  {
    // This really should be on a View and not on the Model
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.passwordHistory;
      },
      versionKey: false,
    },
  }
);

// Model Hooks
userSchema.pre("save", async function (done) {
  if (this.isModified("firstName") || this.isModified("lastName")) {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.password);
    this.passwordHistory = this.passwordHistory || [];

    for (const password of this.passwordHistory) {
      if (await Password.compare(password, this.password)) {
        throw new MongooseError(UserModelErrors.PasswordUsedBefore);
      }
    }

    this.passwordHistory?.push(hashed);
    while (this.passwordHistory.length > PASSWORD_HISTORY_LENGTH) {
      this.passwordHistory.shift();
    }

    this.password = hashed;
  }

  done();
});

// Model Static Methods
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
