const { Category } = require("../models");

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const data = await Category.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
