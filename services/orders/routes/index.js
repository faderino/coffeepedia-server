"use strict";
const router = require("express").Router();
const itemRouter = require("./routeItem");
const userRouter = require("./routeUser");
const orderRouter = require("./orders");
const orderDetailRouter = require("./orderDetails");
router.use("/", userRouter);
router.use("/items", itemRouter);
router.use("/orders", orderRouter);
router.use("/orderDetails", orderDetailRouter);

module.exports = router;
