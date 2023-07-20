// 3rd Party
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";

// Middleware
import { errorHandler } from "./middleware/error-handler";
import { routes } from "./routes/";

// Errors
import { NotFoundError } from "./errors/not-found-error";

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.use(routes);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
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
