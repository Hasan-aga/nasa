const supertest = require("supertest");
const { app } = require("../../app");

describe("test GET /launches", function () {
  test("should return 200 when GET launches", async function () {
    await supertest(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("test POST /launches", function () {
  const testData = {
    mission: "test",
    target: "test",
    rocket: "test",
    launchDate: "1/1/2100",
  };

  const missingProp = { ...testData, ["mission"]: "" };
  const invalidDateObject = { ...testData, ["launchDate"]: "" };

  test("should return 201 when adding new launch", async function () {
    await supertest(app)
      .post("/launches")
      .send(testData)
      .expect("Content-Type", /json/)
      .expect(201);
  });
  test("should have correct flight number", async function () {
    const response = await supertest(app)
      .post("/launches")
      .send(testData)
      .expect("Content-Type", /json/)
      .expect(201);
    expect(response.body.flightNumber).toBe(102);
  });

  test("it should catch missing props", async function () {
    await supertest(app).post("/launches").send(missingProp).expect(400);
  });
  test("it should catch invalid date", async function () {
    await supertest(app).post("/launches").send(invalidDateObject).expect(400);
  });
});
