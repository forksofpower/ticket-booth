import request from "supertest";

import { app } from "../../app";
import { authenticateUser } from "../../test/authenticate-user";

describe("Auth: Change Password", () => {
  it("returns a 401 if not authenticated", async () => {
    await request(app)
      .post("/api/users/change-password")
      .send({
        currentPassword: "password",
        newPassword: "newpassword",
      })
      .expect(400);
  });
  it("returns a 400 if current password is not provided", async () => {
    const cookie = await authenticateUser();

    await request(app)
      .post("/api/users/change-password")
      .set("Cookie", cookie)
      .send({
        newPassword: "newpassword",
      })
      .expect(400);
  });
  it("returns a 400 if new password is not provided", async () => {
    const cookie = await authenticateUser();

    await request(app)
      .post("/api/users/change-password")
      .set("Cookie", cookie)
      .send({
        currentPassword: "password",
      })
      .expect(400);
  });
  it("returns a 400 if current password is incorrect", async () => {
    const cookie = await authenticateUser();

    await request(app)
      .post("/api/users/change-password")
      .set("Cookie", cookie)
      .send({
        currentPassword: "wrongpassword",
        newPassword: "newpassword",
      })
      .expect(400);
  });
  it("returns a 400 if new password is too short", async () => {
    const cookie = await authenticateUser();

    await request(app)
      .post("/api/users/change-password")
      .set("Cookie", cookie)
      .send({
        currentPassword: "password",
        newPassword: "new",
      })
      .expect(400);
  });
  it("returns a 400 if new password is too long", async () => {
    const cookie = await authenticateUser();

    await request(app)
      .post("/api/users/change-password")
      .set("Cookie", cookie)
      .send({
        currentPassword: "password",
        newPassword: "newpasswordnewpasswordnewpassword",
      })
      .expect(400);
  });
  it("returns a 400 if new password is the same as the current password", async () => {
    const cookie = await authenticateUser();

    await request(app)
      .post("/api/users/change-password")
      .set("Cookie", cookie)
      .send({
        currentPassword: "password",
        newPassword: "password",
      })
      .expect(400);
  });
  it("returns a 200 if new password is valid", async () => {
    const cookie = await authenticateUser();

    await request(app)
      .post("/api/users/change-password")
      .set("Cookie", cookie)
      .send({
        currentPassword: "password",
        newPassword: "newpassword",
      })
      .expect(200);
  });
  it("returns a 400 if new password has been used before", async () => {
    const cookie = await authenticateUser();

    await request(app)
      .post("/api/users/change-password")
      .set("Cookie", cookie)
      .send({
        currentPassword: "password",
        newPassword: "newpassword",
      })
      .expect(200);

    await request(app)
      .post("/api/users/change-password")
      .set("Cookie", cookie)
      .send({
        currentPassword: "newpassword",
        newPassword: "password",
      })
      .expect(400);
  });
});
