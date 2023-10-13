import request from "supertest";

import { app } from "../app";

/**
 * Helper function to signup and return cookie
 * @returns Promise<string[]> - Cookie array
 */
export const authenticateUser = async () => {
  const user = {
    email: "test@testing.com",
    password: "password",
    firstName: "John",
    lastName: "Doe",
  };

  const response = await request(app)
    .post("/api/users/signup")
    .send(user)
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
