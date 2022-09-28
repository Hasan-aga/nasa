const http = require("http");
const { app } = require("./app");
const { loadPlanetsData } = require("./model/planet.model");
const mongoose = require("mongoose");
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
    await loadPlanetsData();
    server.listen(PORT, () => console.log("Listening on port ", PORT));
  } catch (error) {
    console.error(error);
  }
}

startServerAfterLoadingData();
