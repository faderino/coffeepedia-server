const Coffeeshop = require("../models/coffeeshopModel");

class Controller {
  static async addCoffeeshop(req, res, next) {
    try {
      const { place_id, name } = req.body;
      await Coffeeshop.addCoffeeshop({ place_id, name });
      res.status(201).json({ message: "place_id added successfully" });
    } catch (err) {
      console.log(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const coffeeshops = await Coffeeshop.findAll();
      res.status(200).json(coffeeshops);
    } catch (err) {
      console.log(err);
    }
  }

  static async findByPlaceId(req, res, next) {
    try {
      const { place_id } = req.params;
      const coffeeshop = await Coffeeshop.findByPlaceId(place_id);
      res.status(200).json(coffeeshop);
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteCoffeeshop(req, res, next) {
    try {
      const { place_id } = req.params;
      await Coffeeshop.delete(place_id);
      res.status(200).json({ message: "coffeeshop deleted successfully" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Controller;
