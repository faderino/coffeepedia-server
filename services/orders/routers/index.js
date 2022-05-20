"use strict";

const express = require("express");
const routerOrder = require("./routerOrder");
const routerOrderDetail = require("./routerOrderDetail");
const router = express.Router();

router.use("/orders", routerOrder);
router.use("/orderDetails", routerOrderDetail);

module.exports = router;
