// 3rd Party
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

// Middleware
import { errorHandler } from "./middleware/error-handler";
import { routes } from "./routes/";

// Errors
import { NotFoundError } from "./errors/not-found-error";
import { config } from "./config";
import { currentUser } from "./middleware/current-user";

const port = process.env.PORT || 4000;
const app = express();

// Allow traffic from nginx proxy
app.set("trust proxy", true);
// Request JSON body support
app.use(express.json());
// Configure Session with cookie support
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
// Configure Routes
app.use(routes);
// Configure Catch-All Route
app.all("*", async (req, res) => {
  throw new NotFoundError();
});
// Configure Error Handling
app.use(errorHandler);
// Configure Server Start
const start = async () => {
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET is undefined");
  }
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
