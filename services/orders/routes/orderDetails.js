"use strict";
const router = require("express").Router();
const OrderDetail = require("../controllers/orderDetailController");

const { authentication } = require("../middlewares/auth");

router.use(authentication);

router.post("/:id", OrderDetail.add);
router.patch("/:id", OrderDetail.updateQty);
router.delete("/:id", OrderDetail.delete);

module.exports = router;
