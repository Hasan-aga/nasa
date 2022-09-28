const supertest = require("supertest");
const { app } = require("../../app");
const mongoConnect = require("../../utils/mongo");

describe("test GET /planets", function () {
  beforeAll(async () => {
    await mongoConnect();
  });
  test("should return 200 when GET planets", async function () {
    await supertest(app)
      .get("/planets")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
