import "express-async-errors";

import cookieSession from "cookie-session";
import express from "express";

import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@forksofpower/ticketbooth-common";

import router from "./routes";

// Configure Application
const app = express();
// Allow traffic from nginx proxy
app.set("trust proxy", true);
// Request JSON body support
app.use(express.json());
// Configure Session with cookie support
app.use(
  cookieSession({
    signed: false,
    sameSite: "none",
    secure: process.env.NODE_ENV !== "test",
  })
);
// Attach currentUser to request
app.use(currentUser);
// Configure Routes
app.use(router);
// Configure Catch-All Route
app.all("*", async () => {
  throw new NotFoundError();
});
// Configure Error Handling
app.use(errorHandler);

export { app };
