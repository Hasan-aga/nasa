const launches = require("./launches.mongo");
const planets = require("./planet.mongo");
const axios = require("axios").default;

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

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
  //TODO: use a method that applies the schema
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
  const validPlanet = await planets.findOne({ kepler_name: launch.target });
  if (!validPlanet) {
    throw new Error(
      `cannot add launch with invalid planet! "${launch.target}" is invalid`
    );
  }
  const flightNumber = (await getLatestFlightNumber()) + 1;
  launch.flightNumber = flightNumber;
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

async function populateSpacexLaunches() {
  try {
    var data = JSON.stringify({
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              customers: 1,
            },
          },
        ],
      },
    });

    var config = {
      method: "post",
      url: process.env.SPACEX_QUERY_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);

    const spacexLaunches = response.data.docs;
    for (const spacexLaunch of spacexLaunches) {
      const launch = {
        flightNumber: spacexLaunch.flight_number,
        mission: spacexLaunch.name,
        rocket: spacexLaunch.rocket.name,
        launchDate: spacexLaunch.date_local,
        upcoming: spacexLaunch.upcoming,
        success: spacexLaunch.success,
        customers: spacexLaunch.payloads.flatMap(
          (payload) => payload.customers
        ),
      };
      console.log(`${launch.flightNumber} - ${launch.customers}`);
      saveLaunch(launch);
    }
    return spacexLaunches;
  } catch (error) {
    console.error(error);
  }
}

async function loadSpacexLaunches() {
  const spacexLaunch = await findLaunch({
    flightNumber: 1,
    mission: "FalconSat",
    rocket: "Falcon 1",
  });

  if (spacexLaunch) {
    console.log(`spacex launches already loaded.`);
  } else {
    console.log(`loading spacex launches...`);
    const spacexLaunches = await populateSpacexLaunches();
    console.log(`we got ${spacexLaunches.length} launches from SpaceX`);
  }
}

module.exports = {
  getAllLaunches,
  scheduleLaunch,
  abortLaunch,
  loadSpacexLaunches,
};
