"use strict";
const { Order, OrderDetail } = require("../models/index");
module.exports = class Controller {
  static async getAll(req, res, next) {
    try {
      const orders = Order.findAll({
        where: {
          UserId: req.user.id,
        },
        include: OrderDetail,
      });
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = Order.findByPk(id);
      if (!order) throw { name: "NotFound" };

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const order = Order.findByPk(id);
      if (!order) throw { name: "NotFound" };

      const { status } = req.body;
      await Order.update(
        { status },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: `Order status updated to ${status}` });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const order = Order.findByPk(id);
      if (!order) throw { name: "NotFound" };

      await Order.delete({ where: { id } });
      res.status(200).json(`Order with id: ${id} deleted`);
    } catch (error) {
      next(error);
    }
  }
};
