const supertest = require("supertest");
const { app } = require("../../app");

describe("test GET /launches", function () {
  test("should return 200", async function () {
    await supertest(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("test POST /launches", function () {
  test("should return 201", async function () {
    await supertest(app)
      .post("/launches")
      .send({
        mission: "test",
        target: "test",
        rocket: "test",
        launchDate: "1/1/2100",
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });

  test("it should catch missing props", async function () {
    await supertest(app)
      .post("/launches")
      .send({
        // mission: "test",
        target: "test",
        rocket: "test",
        launchDate: "1/1/2100",
      })
      .expect(400);
  });
  test("it should catch invalid date", async function () {
    await supertest(app)
      .post("/launches")
      .send({
        mission: "test",
        target: "test",
        rocket: "test",
        launchDate: "invalid date string",
      })
      .expect(400);
  });
});
