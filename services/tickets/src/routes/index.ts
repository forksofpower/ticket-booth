import express from "express";
import { body, param } from "express-validator";

import { requireAuth, validateRequest } from "@forksofpower/ticketbooth-common";

import {
  listTicketsController,
  newTicketController,
  showTicketController,
  updateTicketController,
} from "../controllers";

const router = express.Router();

const validators = {
  params: {
    id: param("id")
      .notEmpty()
      .withMessage("Ticket ID must be provided")
      .isMongoId()
      .withMessage("Ticket ID must be valid"),
  },
  body: {
    title: body("title").notEmpty().withMessage("Title is required"),
    price: body("price")
      .isNumeric()
      .withMessage("Price must be a number")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  },
};

// New ticket
router.post(
  "/api/tickets",
  requireAuth,
  [validators.body.title, validators.body.price],
  validateRequest,
  newTicketController
);

// List all tickets
router.get("/api/tickets", listTicketsController);

// Show ticket
router.get(
  "/api/tickets/:id",
  [validators.params.id],
  validateRequest,
  showTicketController
);

// Update ticket
router.put(
  "/api/tickets/:id",
  requireAuth,
  [validators.params.id, validators.body.title, validators.body.price],
  validateRequest,
  updateTicketController
);

export default router;
