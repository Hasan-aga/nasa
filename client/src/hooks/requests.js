const API_URL = "http://localhost:8000/v1";

async function httpGetPlanets() {
  // Load planets and return as JSON.
  try {
    const response = await fetch(`${API_URL}/planets`);
    if (!response.ok) {
      throw new Error(`failed to get planets, ${response.status}`);
    }
    const planets = await response.json();
    return planets;
  } catch (error) {}
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  try {
    const response = await fetch(`${API_URL}/launches`);
    if (!response.ok)
      throw new Error(`failed to retrieve launches: ${response.status}`);
    const launches = await response.json();
    console.log(launches);
    return launches.sort((a, b) => a.flightNumber - b.flightNumber);
  } catch (error) {
    console.error(error);
  }
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
