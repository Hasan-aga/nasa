const express = require("express");
const { httpGetAllLaunches, httpAddLaunch } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", httpGetAllLaunches);
launchesRouter.post("/launches", httpAddLaunch);

module.exports = launchesRouter;
