import express, { Request, Response } from "express";
import { param } from "express-validator";

import {
  fetchDocumentById,
  validateRequest,
} from "@forksofpower/ticketbooth-common";

import { Ticket } from "../models/ticket";

const router = express.Router();

router.get(
  "/api/tickets/:id",
  param("id").isMongoId().withMessage("Ticket ID must be a valid Mongo ID"),
  validateRequest,
  fetchDocumentById(Ticket),
  async (req: Request, res: Response) => {
    res.send(req.document);
  }
);

export { router as showTicketRouter };
