import express, { Request, Response } from "express";

// import { NotFoundError } from "@forksofpower/ticketbooth-common";

// import { Order } from "../models/order";

const router = express.Router();
router.get("/api/orders/:id", async (req: Request, res: Response) => {
  res.status(501).send("Not implemented");
});

export { router as showOrderRouter };
