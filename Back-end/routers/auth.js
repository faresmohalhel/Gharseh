const express = require('express')
const router = express.Router()
const {Register ,login,forgotPassword,resetPassword} = require('../controllers/auth')

router.route('/register').post(Register);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:resetToken').put(resetPassword);
module.exports = router