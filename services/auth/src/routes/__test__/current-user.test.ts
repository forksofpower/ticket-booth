import request from "supertest";

import { app } from "../../app";
import { authenticateUser } from "../../test/authenticate-user";

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
});
