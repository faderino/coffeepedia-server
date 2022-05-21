"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Item);
      this.belongsTo(models.Order);
    }
  }
  OrderDetail.init(
    {
      ItemId: DataTypes.INTEGER,
      OrderId: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      imageUrl: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
