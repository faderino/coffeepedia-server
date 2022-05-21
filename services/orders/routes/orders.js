"use strict";
const router = require("express").Router();
const app = require("../app");
const Order = require("../controllers/ControllerOrder");
const { authentication } = require("../middlewares/auth");

// router.use(authentication);

router.get("/", Order.getAll);
router.get("/:id", Order.getById);
router.post("/:id", Order.add);
router.patch("/:id", Order.updateStatus);
router.delete("/:id", Order.delete);

module.exports = router;
