"use strict";
const router = require("express").Router();
const AuthController = require("../controllers/AuthController.js");
const errorHandler = require("../middlewares/errorHandler.js");
const itemRouter = require("./itemRouter.js");

router.post(
  "/register",
  // authentication,
  // isAdmin,
  AuthController.register
);

router.post("/login", AuthController.login);

router.use("/orders");
router.use("/orderDetails");
router.use("/items", itemRouter);

router.use(errorHandler);

module.exports = router;
