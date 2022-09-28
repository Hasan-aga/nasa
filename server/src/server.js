const http = require("http");
const { app } = require("./app");
const { loadPlanetsData } = require("./model/planet.model");
const { mongoConnect } = require("./utils/mongo");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServerAfterLoadingData() {
  try {
    await mongoConnect();
    await loadPlanetsData();
    server.listen(PORT, () => console.log("Listening on port ", PORT));
  } catch (error) {
    console.error(error);
  }
}

startServerAfterLoadingData();
