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
    const response = await fetch(`${API_URL}/launches`, requestOptions);
    const data = await response.json();
    if (!response.ok) {
      throw data.error;
    }
    return response;
  } catch (error) {
    console.error("ERROR!!! ", JSON.stringify(error));
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(`${API_URL}/launches/${id}`, requestOptions);
    const data = await response.json();
    if (!response.ok) {
      throw data.error;
    }
    return response;
  } catch (error) {
    console.error("ERROR!!! ", JSON.stringify(error));
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
