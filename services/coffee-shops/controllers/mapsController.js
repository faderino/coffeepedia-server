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

  static async placeDetail(req, res, next) {
    try {
      const {place_id} = req.query
      const detail = await Maps.placeDetail(place_id)
      res.status(200).json(detail)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller;
