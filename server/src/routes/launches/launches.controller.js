const {
  getAllLaunches,
  addLaunch,
  abortLaunch,
} = require("../../model/launches.model");

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
    !launch.target
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

function httpRemoveLaunch(req, res) {
  const removeID = Number(req.params.id);
  abortLaunch(removeID)
    ? res.status(200).json({ removed: removeID })
    : res
        .status(404)
        .json({ error: "failed to remove! object does not exist" });
  return;
}

module.exports = {
  httpGetAllLaunches,
  httpAddLaunch,
  httpRemoveLaunch,
};
