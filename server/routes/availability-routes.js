const express = require('express')

const availabilityRoutes = require('./../controllers/availability-controller')

//create router
const availRouter = express.Router()

//add route for GET request
// in server.js, the route is specified as /reservation/all
availRouter.get('/roomList/:room', availabilityRoutes.reservationList)


module.exports = availRouter