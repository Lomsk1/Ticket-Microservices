import request from "supertest";
import app from "../../app";

it("responds with details about the current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/v1/users/me")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("Response with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/v1/users/me")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
