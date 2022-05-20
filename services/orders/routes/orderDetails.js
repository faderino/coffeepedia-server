"use strict";
const router = require("express").Router();
const OrderDetail = require("../controllers/orderDetailController");

router.patch("/id", OrderDetail.updateQty);

router.delete("/:id", OrderDetail.delete);

module.exports = router;
