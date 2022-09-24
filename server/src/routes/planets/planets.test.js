const supertest = require("supertest");
const { app } = require("../../app");

describe("test GET /planets", function () {
  test("should return 200 when GET planets", async function () {
    await supertest(app)
      .get("/planets")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
