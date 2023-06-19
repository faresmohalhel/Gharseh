const express = require('express')
const router = express.Router()
const {getEvents, getOneEvent, getEventsByVolunteer, getEventsByDoner} = require('../controllers/events');
const verifyUser = require('../middleware/verifyUser');

/// ALL About Users
router.get('/getEvents',getEvents);
router.get('/getOneEvent/:id',  getOneEvent);
router.get('/getVolunteerEvents',verifyUser,getEventsByVolunteer)
router.get('/getDonerEvent',verifyUser,getEventsByDoner)

module.exports = router