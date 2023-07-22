import mongoose from "mongoose";
import { config } from "./config";
import { app } from "./app";

const port = process.env.PORT || 4000;

const start = async () => {
  if (!config.jwtSecret) throw new Error("JWT_SECRET is undefined");

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};
start();
