"use strict";
const { OrderDetail } = require("../models/index");
module.exports = class Controller {
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const found = await OrderDetail.findByPk(id);
      if (!found) throw { name: "NotFound" };

      await OrderDetail.delete({
        where: { id },
      });
      res.status(200).json({ message: `Delete success` });
    } catch (error) {
      next(error);
    }
  }

  static async updateQty(req, res, next) {
    try {
      const { id } = req.params;
      const { action } = req.body;
      const found = await OrderDetail.findByPk(id);
      if (!found) throw { name: "NotFound" };

      let newQty = found.quantity;
      if (action === "increment") {
        await OrderDetail.increment("quantity", { by: 1 });
        newQty -= 1;
      } else if (action === "decrement") {
        await OrderDetail.decrement("quantity", { by: 1 });
        newQty += 1;
      }
      res.status(200).json({
        message: `Quantity updated from ${found.quantity} to ${newQty}`,
      });
    } catch (error) {
      next(error);
    }
  }
};
