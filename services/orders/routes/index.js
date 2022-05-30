"use strict";
const router = require("express").Router();
const itemRouter = require("./routeItem");
const userRouter = require("./routeUser");
const orderRouter = require("./orders");
const orderDetailRouter = require("./orderDetails");
const paymentRouter = require("./payment");
const cateogryRouter = require("./routeCategory");

router.use("/", userRouter);
router.use("/items", itemRouter);
router.use("/orders", orderRouter);
router.use("/orderDetails", orderDetailRouter);
router.use("/payments", paymentRouter);
router.use("/categories", cateogryRouter);

module.exports = router;
