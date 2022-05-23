if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// require('dotenv').config()
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const app = express()
const router = require('./routes/index')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

app.use(errorHandler)

module.exports = app