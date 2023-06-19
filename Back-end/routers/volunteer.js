const express = require('express');
const router = express.Router();
const { Volunteer } = require('../controllers/Volunteer');
const auth = require('../middleware/auth');

router.route('/volunteer/:id').post(Volunteer);

module.exports = router;