import express, { Request, Response } from "express";

import { NotImplementedError } from "@forksofpower/ticketbooth-common";

// import { Order } from "../models/order";

const router = express.Router();
router.get("/api/tickets", async (req: Request, res: Response) => {
  throw new NotImplementedError();
});

export { router as listOrderRouter };
