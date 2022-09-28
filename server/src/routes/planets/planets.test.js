const supertest = require("supertest");
const { app } = require("../../app");
const { mongoConnect, mongoDisonnect } = require("../../utils/mongo");

describe("test /planets API", function () {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisonnect();
  });

  test("should return 200 when GET planets", async function () {
    await supertest(app)
      .get("/planets")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
