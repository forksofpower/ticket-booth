import express, { Request, Response } from "express";

// import { body } from "express-validator";

// import {
//     NotAuthorizedError, NotFoundError, OrderUpdatedPublisher, requireAuth, validateRequest
// } from "@forksofpower/ticketbooth-common";

// import { Order } from "../models/order";
// import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

router.put("/api/orders/:id", async (req: Request, res: Response) => {
  res.status(501).send("Not implemented");
});

export { router as updateOrderRouter };
