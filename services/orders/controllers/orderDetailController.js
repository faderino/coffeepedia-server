"use strict";
const { OrderDetail, sequelize } = require("../models/index");
module.exports = class Controller {
  static async add(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity, OrderId, name, price, imageUrl } = req.body;

      let response = await OrderDetail.findOne({
        where: {
          OrderId,
          ItemId: id,
        },
      });

      if (response) {
        throw {
          message: "Item sudah ada dikerjanjang. perbaharui isi keranjang?",
          isOrdered: "true",
        };
      }

      if (!response) {
        const data = {
          OrderId,
          ItemId: id,
          name,
          price,
          quantity,
          imageUrl,
        };

        response = await OrderDetail.create(data);
      }
      //
      delete response.dataValues.createdAt;
      delete response.dataValues.updatedAt;

      res.status(200).json({
        statusCode: 201,
        message: "OrderDetail Created Success",
        response,
      });
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const found = await OrderDetail.findByPk(+id);
      if (!found) throw "DataNotFound";

      await OrderDetail.destroy({
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
      const { action, quantity } = req.body;
      const found = await OrderDetail.findByPk(+id);
      if (!found) throw "DataNotFound";
      let newQty = found.quantity;
      if (action === "increment") {
        await OrderDetail.increment("quantity", {
          by: 1,
          where: {
            id,
          },
        });
        newQty += 1;
      } else if (action === "decrement") {
        console.log(action);
        await OrderDetail.decrement("quantity", {
          by: 1,
          where: {
            id,
          },
        });
        newQty -= 1;
      } else if (action === "true") {
        await OrderDetail.update(
          { quantity },
          {
            where: { id },
          }
        );
        newQty = quantity;
      }
      res.status(200).json({
        message: `Quantity updated from ${found.quantity} to ${newQty}`,
      });
    } catch (error) {
      next(error);
    }
  }
};
