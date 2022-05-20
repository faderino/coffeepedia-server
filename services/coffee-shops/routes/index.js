const express = require('express')
const router = express.Router()
const coffeeshops = require('./coffeeshops')

router.use('/coffeeshops', coffeeshops)

module.exports = router