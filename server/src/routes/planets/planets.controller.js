const { planets } = require("../../model/planet.model");

function httpGetAllPlanets(req, res) {
  return res.status(200).json(planets);
}

module.exports = {
  httpGetAllPlanets,
};
