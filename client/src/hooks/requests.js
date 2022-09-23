const API_URL = "http://localhost:7000";

async function httpGetPlanets() {
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/planets`);
  const planets = await response.json();
  return planets;
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${API_URL}/launches`);
  const launches = await response.json();
  return launches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  // Submit given launch data to launch system.
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(launch),
  };
  try {
    await fetch(`${API_URL}/launches`, requestOptions);
  } catch (error) {
    console.error(error);
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
