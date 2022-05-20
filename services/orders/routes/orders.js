"use strict";
const router = require("express").Router();
const Order = require("../controllers/orderController");

router.get("/", Order.getAll);
router.get("/:id", Order.getById);

router.patch("/id", Order.updateStatus);

router.delete("/:id", Order.delete);

module.exports = router;
