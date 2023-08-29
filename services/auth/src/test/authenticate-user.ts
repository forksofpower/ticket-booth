import request from "supertest";

import { app } from "../app";

/**
 * Helper function to signup and return cookie
 * @returns Promise<string[]> - Cookie array
 */
export const authenticateUser = async () => {
  const email = "test@testing.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
