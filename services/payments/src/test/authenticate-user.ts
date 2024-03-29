import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// import { config } from "../config";

/**
 * Helper function to signup and return cookie
 * @returns Promise<string[]> - Cookie array
 */
export const authenticateUser = (
  id: string = new mongoose.Types.ObjectId().toHexString()
) => {
  // build a JWT payload
  const payload = {
    id,
    email: "test@test.com",
  };
  // create the JWT
  const userJwt = jwt.sign(payload, "asdfasdf");
  // Build session Object { jwt: MY_JWT }
  const session = {
    jwt: userJwt,
  };
  // convert session to json
  const json = JSON.stringify(session);
  // encode json as base64
  const base64 = Buffer.from(json).toString("base64");
  // return cookie as string enclosed an array
  return [`session=${base64}`];
};
