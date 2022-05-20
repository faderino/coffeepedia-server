"use strict";

const { Order, sequelize } = require("../models/index");

class ControllerOrder {
  static async add(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { CoffeeShopId } = req.params;
      const id = req.user?.id || 1;

      let response = await Order.findOne(
        {
          where: {
            UserId: id,
            CoffeeShopId: CoffeeShopId,
            status: "unpaid",
          },
        },
        { transaction: t }
      );

      let send = {
        statusCode: 200,
        message: "Cart Found",
        response,
      };

      if (!response) {
        const data = {
          UserId: id,
          CoffeeShopId,
          status: "unpaid",
        };

        response = await Order.create(data, { transaction: t });

        if (response) {
          send = {
            statusCode: 201,
            message: "Cart Created Success",
            response,
          };
        }
      }

      delete response.dataValues.createdAt;
      delete response.dataValues.updatedAt;

      await t.commit();

      res.status(200).json(send);
    } catch (err) {
      await t.rollback();

      res
        .status(500)
        .json({ statusCode: 500, message: "Internal Server Error" });
    }
  }

  static async delete(req, res, next) {
    try {
      const { OrderId } = req.params;

      let response = await Order.destroy({
        where: {
          id: OrderId,
        },
      });

      if (response === 0) {
        throw {
          message: "NOT_FOUND",
        };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Cart Cleaned",
      });
    } catch (err) {
      let status = 500;
      let message = "Internal Server Error";

      if (err.message) {
        status = 404;
        message = "Item tidak ditemukan";
      }

      res.status(status).json({ statusCode: status, message: message });
    }
  }
}
module.exports = ControllerOrder;
