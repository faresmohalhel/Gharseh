const express = require('express')
const router = express.Router()
const {getUser, updateUser,getOneUser} = require('../controllers/user');
const verifyUser = require('../middleware/verifyUser');

/// ALL About Users
// router.route('/updateUser/:id').post(updateUser);
router.get('/getUser', verifyUser, getUser);
router.get('/getOneUser/:id', getOneUser);
router.put('/updateUser', updateUser)

module.exports = router