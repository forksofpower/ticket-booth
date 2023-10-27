import { Router } from "express";
import { body } from "express-validator";

import { newPaymentController } from "@/controllers";
import { requireAuth, validateRequest } from "@forksofpower/ticketbooth-common";

const router = Router();

router.post(
  "/payments",
  requireAuth,
  [
    body("token").notEmpty().withMessage("Token must be provided"),
    body("orderId")
      .notEmpty()
      .isMongoId()
      .withMessage("Order ID must be provided"),
  ],
  validateRequest,
  newPaymentController
);

export default router;
