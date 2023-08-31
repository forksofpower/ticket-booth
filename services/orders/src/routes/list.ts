import express, { Request, Response } from "express";

// import { Order } from "../models/order";

const router = express.Router();
router.get("/api/tickets", async (req: Request, res: Response) => {
  res.status(501).send("Not implemented");
});

export { router as listOrderRouter };
