const express = require('express')
const router = express.Router()
const {Payment} = require('../controllers/Payment')

router.route('/Payment/:id').post(Payment);
module.exports = router