import request from "supertest";

import { app } from "@/app";
import { User } from "@/models/user";
import { authenticateUser } from "@/test/authenticate-user";

describe("Auth: Current User", () => {
  it("responds with null if not authenticated", async () => {
    const response = await request(app)
      .get("/api/users/currentuser")
      .send({})
      .expect(200);
    expect(response.body.currentUser).toBeNull();
  });

  it("responds with details about the current user", async () => {
    const cookie = await authenticateUser();

    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .send({
        email: "test@testing.com",
        password: "password",
      })
      .expect(200);
    expect(response.body.currentUser.email).toEqual("test@testing.com");
  });

  it("updates the user's first name", async () => {
    const cookie = await authenticateUser();

    const response = await request(app)
      .patch("/api/users/currentuser")
      .set("Cookie", cookie)
      .send({
        firstName: "John",
      })
      .expect(200);

    expect(response.body.firstName).toEqual("John");

    const user = await User.findById(response.body.id);
    expect(user?.firstName).toEqual("John");
  });

  it("updates the user's last name", async () => {
    const cookie = await authenticateUser();

    const response = await request(app)
      .patch("/api/users/currentuser")
      .set("Cookie", cookie)
      .send({
        firstName: "John",
        lastName: "Doe",
      })
      .expect(200);

    expect(response.body.lastName).toEqual("Doe");

    const user = await User.findById(response.body.id);
    expect(user?.lastName).toEqual("Doe");
  });

  it("updates the user's first and last name", async () => {
    const cookie = await authenticateUser();

    const response = await request(app)
      .patch("/api/users/currentuser")
      .set("Cookie", cookie)
      .send({
        firstName: "John",
        lastName: "Doe",
      })
      .expect(200);

    expect(response.body.firstName).toEqual("John");
    expect(response.body.lastName).toEqual("Doe");

    const user = await User.findById(response.body.id);
    expect(user?.firstName).toEqual("John");
    expect(user?.lastName).toEqual("Doe");
  });

  it("returns an error if user is not authenticated", async () => {
    await request(app)
      .patch("/api/users/currentuser")
      .send({
        firstName: "John",
      })
      .expect(401);
  });

  it("returns an error if user is not found", async () => {
    const cookie = await authenticateUser();

    await User.deleteMany({});

    await request(app)
      .patch("/api/users/currentuser")
      .set("Cookie", cookie)
      .send({
        firstName: "John",
      })
      .expect(400);
  });
});
