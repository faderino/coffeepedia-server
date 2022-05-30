const express = require('express')
const router = express.Router()
const mapsController = require('../controllers/mapsController')

router.get('/nearbySearch', mapsController.nearbySearch)
router.get('/placeDetail', mapsController.placeDetail)

module.exports = router