const http = require("http");
const { app } = require("./app");
const { planetPromise } = require("./model/planet.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServerAfterLoadingData() {
  await planetPromise;
  server.listen(PORT, () => console.log("Listening on port ", PORT));
}

startServerAfterLoadingData();
