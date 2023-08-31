import express, { Request, Response } from "express";

// import { body } from "express-validator";
// import {
//     OrderCreatedPublisher, requireAuth, validateRequest
// } from "@forksofpower/ticketbooth-common";
// import { Order } from "../models/order";

// import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post("/api/orders", async (req: Request, res: Response) => {
  res.status(501).send("Not implemented");
});

export { router as createOrderRouter };
