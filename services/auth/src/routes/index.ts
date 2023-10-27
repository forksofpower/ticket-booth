import { Router } from "express";
import { body } from "express-validator";

import {
  changePasswordController,
  currentUserController,
  signinController,
  signoutController,
  signupController,
  updateUserProfileController,
} from "@/controllers";
import {
  currentUser,
  requireAuth,
  validateRequest,
} from "@forksofpower/ticketbooth-common";

const router = Router();

/**
 * Change Password
 */
router.post(
  "/api/users/change-password",
  [
    body("currentPassword")
      .isString()
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  currentUser,
  changePasswordController
);

/**
 * Current User
 */
router.get("/api/users/currentuser", currentUser, currentUserController);

/**
 * Update User Profile
 */
router.patch(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  [
    body("firstName").not().isEmpty().withMessage("First name is required"),
    body("lastName").optional().isString(),
  ],
  validateRequest,
  updateUserProfileController
);

/**
 * Sign In
 */
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  signinController
);

/**
 * Sign Up
 */
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("firstName")
      .isAlphanumeric()
      .withMessage("First name must be alphanumeric"),
    body("lastName")
      .isAlphanumeric()
      .withMessage("Last name must be alphanumeric"),
  ],
  validateRequest,
  signupController
);

/**
 * Sign Out
 */

router.get("/api/users/signout", signoutController);

export default router;
