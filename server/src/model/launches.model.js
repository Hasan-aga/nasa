const launches = new Map();
let lastFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "kepler is dumb",
  rocket: "solid fuel",
  launchDate: new Date("11 11 2024"),
  destination: "keplaroid",
  customer: ["me", "myself"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addLaunch(launch) {
  lastFlightNumber++;
  launches.set(
    lastFlightNumber,
    Object.assign(launch, {
      flightNumber: lastFlightNumber,
      customer: ["Hasan Aga", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

module.exports = {
  getAllLaunches,
  addLaunch,
};
