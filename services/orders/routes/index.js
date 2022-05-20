"use strict";
const router = require("express").Router();

router.use("/users");
router.use("/orders");
router.use("/orderDetails");
router.use("/items");

module.exports = router;
