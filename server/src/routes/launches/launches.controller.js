const {
  getAllLaunches,
  scheduleLaunch,
  abortLaunch,
} = require("../../model/launches.model");

async function httpGetAllLaunches(req, res) {
  try {
    return res.status(200).json(await getAllLaunches());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function httpAddLaunch(req, res) {
  const launch = req.body;

  try {
    // validation
    if (
      !launch.mission ||
      !launch.launchDate ||
      !launch.rocket ||
      !launch.target
    ) {
      throw new Error("Some required props are missing!");
    }

    launch.launchDate = new Date(launch.launchDate);

    if (launch.launchDate.toString().toLowerCase() === "invalid date") {
      throw new Error();
    }

    const result = await scheduleLaunch(launch);
    return res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

async function httpRemoveLaunch(req, res) {
  const removeID = Number(req.params.id);
  try {
    const launchAborted = await abortLaunch(removeID);
    res.status(200).json(launchAborted);
    return launchAborted;
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  httpGetAllLaunches,
  httpAddLaunch,
  httpRemoveLaunch,
};
