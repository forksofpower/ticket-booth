import request from "supertest";
import { app } from "../../app";

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
});
