const { parse } = require("csv-parse");
const { createReadStream } = require("fs");
const path = require("path");

const maybeHabitable = function (planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};
const habitablePlanets = [];
console.log(__dirname);
const planetPromise = new Promise(function (resolve, reject) {
  createReadStream(path.join(__dirname, "..", "data", "kepler_data.csv"))
    .pipe(
      parse({
        comment: "#",
        columns: true,
      })
    )
    .on("data", (chunk) => {
      if (maybeHabitable(chunk)) habitablePlanets.push(chunk);
    })
    .on("end", () => {
      resolve(habitablePlanets);
    })
    .on("error", (error) => {
      reject(`we have a problem, ${error}`);
      console.error(`we have a problem, ${error}`);
    });
});
module.exports = { planets: habitablePlanets, planetPromise };
