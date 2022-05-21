const express = require("express");
const PaymentController = require("../controllers/PaymentController");
const { authentication } = require("../middlewares/auth");
const router = express.Router();

router.use(authentication);

router.post("/", PaymentController.midTrans);

module.exports = router;
