"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const router = require("./routers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

app.use(routes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json(error);
});

module.exports = app;
