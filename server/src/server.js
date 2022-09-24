const http = require("http");
const { app } = require("./app");
const { planetPromise } = require("./model/planet.model");

const PORT = process.env.PORT;

const server = http.createServer(app);

async function startServerAfterLoadingData() {
  try {
    await planetPromise;
    server.listen(PORT, () => console.log("Listening on port ", PORT));
  } catch (error) {
    console.error(error);
  }
}

startServerAfterLoadingData();
