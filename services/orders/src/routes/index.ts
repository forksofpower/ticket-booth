import express from "express";
import { body, param } from "express-validator";

import {
  deleteOrderController,
  listOrdersController,
  newOrderController,
  showOrderController,
} from "@/controllers";
import {
  currentUser,
  requireAuth,
  validateRequest,
} from "@forksofpower/ticketbooth-common";

const router = express.Router();

const validators = {
  params: {
    id: param("id")
      .notEmpty()
      .withMessage("ID must be provided")
      .isMongoId()
      .withMessage("ID must be correctly formatted"),
  },
  body: {
    ticketId: body("ticketId")
      .notEmpty()
      .withMessage("ticketId must be provided")
      .isMongoId()
      .withMessage("ticketId must be correctly formatted"),
  },
};

/**
 * List Orders
 */
router.get("/api/orders", requireAuth, listOrdersController);

/**
 * New Order
 */
router.post(
  "/api/orders",
  currentUser,
  requireAuth,
  [validators.body.ticketId],
  validateRequest,
  newOrderController
);

/**
 * Show Order
 */
router.get(
  "/api/orders/:id",
  currentUser,
  requireAuth,
  [validators.params.id],
  validateRequest,
  showOrderController
);

/**
 * Delete Order
 */
router.delete(
  "/api/orders/:id",
  [validators.params.id],
  currentUser,
  requireAuth,
  validateRequest,
  deleteOrderController
);

export default router;
