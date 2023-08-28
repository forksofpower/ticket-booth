import request from 'supertest';

import { app } from '../../app';
import { authenticateUser } from '../../test/authenticate-user';

describe("Auth: Signout", () => {
  it("clears the cookie after signing out", async () => {
    await authenticateUser();
    const response = await request(app)
      .get("/api/users/signout")
      .send()
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
