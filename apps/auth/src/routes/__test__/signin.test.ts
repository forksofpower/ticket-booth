import request from 'supertest';

import { app } from '../../app';
import { authenticateUser } from '../../test/authenticate-user';

describe("Auth: Signin", () => {
  it("fails when an email that does not exist is supplied", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(400);
  });

  it("fails when no password is supplied", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
      })
      .expect(400);
  });

  it("fails when an incorrect password is supplied", async () => {
    await authenticateUser();
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@testing.com",
        password: "wrongpassword",
      })
      .expect(400);
  });

  it("sets a cookie on successful signin", async () => {
    await authenticateUser();
    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@testing.com",
        password: "password",
      })
      .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
