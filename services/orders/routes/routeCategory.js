const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();

//Read Products
router.get("/", CategoryController.getCategories);

module.exports = router;
