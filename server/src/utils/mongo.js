const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready.");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

let MONGO_URL;
async function mongoConnect() {
  MONGO_URL =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_TEST_URL
      : process.env.MONGO_URL;
  console.log(MONGO_URL);
  await mongoose.connect(MONGO_URL);
}
async function mongoDisonnect() {
  await mongoose.disconnect(MONGO_URL);
}

module.exports = { mongoConnect, mongoDisonnect };
