const express = require('express')
const router = express.Router()
const coffeeshops = require('../controllers/coffeeshopsController')

router.get('/', coffeeshops.findAll)
router.get('/:place_id', coffeeshops.findByPlaceId)
router.post('/addCoffeeshop', coffeeshops.addCoffeeshop)
router.delete('/delete/:place_id', coffeeshops.deleteCoffeeshop)

module.exports = router