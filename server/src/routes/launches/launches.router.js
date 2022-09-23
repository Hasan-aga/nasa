const express = require("express");
const {
  httpGetAllLaunches,
  httpAddLaunch,
  httpRemoveLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", httpGetAllLaunches);
launchesRouter.post("/launches", httpAddLaunch);
launchesRouter.delete("/launches/:id", httpRemoveLaunch);

module.exports = launchesRouter;
