"use strict";

const { Order, OrderDetail, sequelize } = require("../models/index");

class ControllerOrder {
  static async add(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const UserId = req.user.id;
      let resStatus = 200;
      let response = await Order.findOne(
        {
          where: {
            UserId,
            CoffeeShopId: id,
            status: "unpaid",
          },
        },
        { transaction: t }
      );

      console.log(response);
      let send = {
        message: "Cart Found",
        response,
      };

      if (!response) {
        const data = {
          UserId,
          CoffeeShopId: id,
          status: "unpaid",
        };

        response = await Order.create(data, { transaction: t });

        if (response) {
          resStatus = 201;
          send = {
            message: "Cart Created Success",
            response,
          };
        }
      }

      await t.commit();

      res.status(resStatus).json(send);
    } catch (err) {
      await t.rollback();

      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      let response = await Order.destroy({
        where: {
          id,
        },
      });

      if (response === 0) {
        throw "DataNotFound";
      }

      res.status(200).json({ message: `Order with id: ${id} deleted` });
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const orders = await Order.findAll({
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
      const order = await Order.findByPk(+id, { include: OrderDetail });
      if (!order) throw "DataNotFound";

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(+id);
      if (!order) throw "DataNotFound";

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
}
module.exports = ControllerOrder;
