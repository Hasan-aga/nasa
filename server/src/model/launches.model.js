const launches = require("./launches.mongo");
const planets = require("./planet.mongo");

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return process.env.DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  try {
    const results = await launches.find({});
    return results;
  } catch (error) {
    console.error(`couldn't get launches from database, ${error}`);
    throw new Error(`couldn't get launches from database, ${error}`);
  }
}

async function getLaunchById(id) {
  try {
    return await launches.findOne({ flightNumber: id });
  } catch (error) {
    console.error(`couldn't find a launch with id:${id}, ${error}`);
  }
}

async function saveLaunch(launch) {
  const validPlanet = await planets.findOne({ kepler_name: launch.target });
  if (!validPlanet) {
    throw new Error(
      `cannot add launch with invalid planet! "${launch.target}" is invalid`
    );
  }
  await launches.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
  return launch;
}

async function scheduleLaunch(launch) {
  const flightNumber = (await getLatestFlightNumber()) + 1;
  launch.flightNumber = flightNumber;
  launch.customer = ["Hasan Aga", "NASA"];
  launch.upcoming = true;
  launch.success = true;
  try {
    return await saveLaunch(launch);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function abortLaunch(id) {
  try {
    const existsLaunch = await getLaunchById(id);
    if (!existsLaunch) {
      throw new Error(`No launch with id:${id} exists!`);
    }
    if (!existsLaunch.upcoming) {
      throw new Error(`Launch with id:${id} already aborted!`);
    }
    existsLaunch.upcoming = false;
    existsLaunch.success = false;

    return saveLaunch(existsLaunch);
  } catch (error) {
    console.error("failed to abort! ", error);
    throw error;
  }
}

module.exports = {
  getAllLaunches,
  scheduleLaunch,
  abortLaunch,
};
