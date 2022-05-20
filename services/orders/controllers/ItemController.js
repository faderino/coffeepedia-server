const { Item } = require("../models");

class ItemController {
  static async getItems(req, res, next) {
    try {
      const data = await Item.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getItemById(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Item.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!data) {
        throw `DataNotFound`;
      } else {
        res.status(200).json({
          message: `Found data with ID ${id} Success`,
          Item: data,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ItemController;
