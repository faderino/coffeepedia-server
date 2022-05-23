const Maps = require("../models/mapsModel");

class Controller {
  static async nearbySearch(req, res, next) {
    try {
      const { latitude, longitude } = req.query;
      const nearby = await Maps.nearbySearch({ latitude, longitude });
      res.status(200).json(nearby);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
