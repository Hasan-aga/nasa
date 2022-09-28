const { parse } = require("csv-parse");
const { createReadStream } = require("fs");
const path = require("path");
const planets = require("./planet.mongo");

const maybeHabitable = function (planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};
const loadPlanetsData = function () {
  return new Promise(function (resolve, reject) {
    createReadStream(path.join(__dirname, "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (chunk) => {
        if (maybeHabitable(chunk)) {
          await savePlanet(chunk);
        }
      })
      .on("end", async () => {
        const numberOfPlanets = (await getAllPlanets()).length;
        console.log(`we found ${numberOfPlanets} habitable planet.`);
        resolve();
      })
      .on("error", (error) => {
        reject(`we have a problem, ${error}`);
        console.error(`we have a problem, ${error}`);
      });

    async function savePlanet(planet) {
      try {
        await planets.updateOne(
          { kepler_name: planet.kepler_name },
          { kepler_name: planet.kepler_name },
          { upsert: true }
        );
      } catch (error) {
        console.error(`couldn't save planet, ${error}`);
      }
    }
  });
};

async function getAllPlanets() {
  try {
    return await planets.find({}, { __v: 0, _id: 0 });
  } catch (error) {
    console.error(`couldn't get planets, ${error}`);
  }
}
module.exports = { getAllPlanets, loadPlanetsData };
