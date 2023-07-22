import request from "supertest";
import { app } from "../../app";
import { authenticateUser } from "../../test/authenticate-user";

describe("Auth: Signup", () => {
  it("returns a 201 on successful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@testing.com",
        password: "password",
      })
      .expect(201);
  });

  it("returns a 400 with an invalid email and password", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        password: "password",
      })
      .expect(400);

    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@testing.com",
      })
      .expect(400);
  });

  it("disallows duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@testing.com",
        password: "password",
      })
      .expect(201);
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@testing.com",
        password: "password",
      })
      .expect(400);
  });

  it("sets a cookie on successful signup", async () => {
    const cookie = await authenticateUser();
    expect(cookie).toBeDefined();
  });
});
