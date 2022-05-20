"use strict";

const express = require("express");
const ControllerOrderDetail = require("../controllers/ControllerOrderDetail");

const routerOrderDetail = express.Router();

// ORDER

routerOrderDetail.post("/:ItemId", ControllerOrderDetail.add);
// routerOrder.get("/:id", ControllerOrder.one);

// ORDER DETAIL

// routerOrder.delete("/:id/delete", ControllerOrder.delete);
// routerOrder.patch("/:id/update", ControllerOrder.update);

module.exports = routerOrderDetail;
