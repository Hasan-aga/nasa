const { getAllLaunches, addLaunch } = require("../../model/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddLaunch(req, res) {
  const launch = req.body;

  // validation
  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.rocket ||
    !launch.destination
  ) {
    return res.status(400).json({
      error: "Some required props are missing!",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (launch.launchDate.toString().toLowerCase() === "invalid date") {
    return res.status(400).json({
      error: "Invalid date!",
    });
  }

  addLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddLaunch,
};
