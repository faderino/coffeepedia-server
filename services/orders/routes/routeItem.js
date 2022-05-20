const express = require("express");
const ItemController = require("../controllers/ItemController");
const { authentication, isAdmin } = require("../middlewares/auth");
const router = express.Router();

//Read Products
router.get("/", ItemController.getItems);

// Get Products By Id
router.get("/:id", ItemController.getItemById);

module.exports = router;
