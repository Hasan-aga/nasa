const { parse } = require("csv-parse");
const { createReadStream } = require("fs");

const maybeHabitable = function (planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const habitablePlanets = [];

createReadStream("./kepler_data.csv")
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
    console.log(`${habitablePlanets.length} habitable planets found.`);
    console.log(
      habitablePlanets.map(
        (planet, index) => index + " " + planet["kepler_name"]
      )
    );
  })
  .on("error", (error) => console.error(`we have a problem, ${error}`));

module.exports = habitablePlanets;
