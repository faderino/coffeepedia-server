const express = require('express')
const router = express.Router()
const coffeeshops = require('./coffeeshops')
const maps = require('./maps')

router.use('/coffeeshops', coffeeshops)
router.use('/maps', maps)

module.exports = router