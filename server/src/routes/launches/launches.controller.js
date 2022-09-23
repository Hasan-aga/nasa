const { getAllLaunches, addLaunch } = require("../../model/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddLaunch(req, res) {
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);
  addLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddLaunch,
};
