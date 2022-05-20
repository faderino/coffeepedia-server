"use strict";

const { OrderDetail, sequelize } = require("../models/index");

class ControllerOrderDetail {
  static async add(req, res, next) {
    try {
      const { ItemId } = req.params;
      const { quantity, OrderId, name, price, imageUrl } = req.body;

      let response = await OrderDetail.findOne({
        where: {
          OrderId,
          ItemId,
        },
      });

      if (response) {
        throw {
          message: "Item sudah ada dikerjanjang. perbaharui isi keranjang?",
          isOrdered: true,
        };
      }

      if (!response) {
        const data = {
          OrderId,
          ItemId,
          name,
          price: quantity * price,
          quantity,
          imageUrl,
        };

        response = await OrderDetail.create(data);
      }

      delete response.dataValues.createdAt;
      delete response.dataValues.updatedAt;

      res.status(200).json({
        statusCode: 201,
        message: "OrderDetail Created Success",
        response,
      });
    } catch (err) {
      let status = 500;
      let message = "Internal Server Error";

      if (err.isOrdered) {
        status = 400;
        message = err.message;
      }

      res.status(status).json({ statusCode: status, message: message });
    }
  }
}
module.exports = ControllerOrderDetail;
