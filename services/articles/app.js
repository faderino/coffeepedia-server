if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
<<<<<<< HEAD
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const express = require("express");
const { connection } = require("./config/connection.js");
const app = express();
const port = process.env.PORT;
const router = require("./routes/index");
=======

// require('dotenv').config()
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const app = express()
const router = require('./routes/index')
>>>>>>> 4e066734bf6251c6c6d353fb9ecacc87180a8018

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

module.exports = app;
