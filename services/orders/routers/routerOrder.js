"use strict";

const express = require("express");
const ControllerOrder = require("../controllers/ControllerOrder");

const routerOrder = express.Router();

routerOrder.post("/:CoffeeShopId", ControllerOrder.add);
// routerOrder.get("/:id", ControllerOrder.one);
routerOrder.delete("/:OrderId", ControllerOrder.delete);
// routerOrder.patch("/:id/update", ControllerOrder.update);

module.exports = routerOrder;
