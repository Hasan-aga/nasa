const http = require("http");
const { app } = require("./app");
const { planetPromise } = require("./model/planet.model");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready.");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function startServerAfterLoadingData() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await planetPromise;
    server.listen(PORT, () => console.log("Listening on port ", PORT));
  } catch (error) {
    console.error(error);
  }
}

startServerAfterLoadingData();
