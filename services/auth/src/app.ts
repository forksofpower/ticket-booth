import "express-async-errors";

import cookieSession from "cookie-session";
// 3rd Party
import express from "express";

// Common
import { errorHandler, NotFoundError } from "@forksofpower/ticketbooth-common";

import { healthCheck } from "./health";
import router from "./routes/";

// Configure Auth Application
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

// Configure Routes
app.use(router);
// Health Check
app.use(healthCheck);
// Configure Catch-All Route
app.all("*", async () => {
  throw new NotFoundError();
});
// Configure Error Handling
app.use(errorHandler);

export { app };
