const express = require('express')

const reservationRoutes = require('./../controllers/reservation-controller')

//create router
const resRouter = express.Router()

//add route for GET request
// in server.js, the route is specified as /reservation/all
resRouter.get('/all', reservationRoutes.reservationAll)

//GET for user cal data
resRouter.get('/user/:author', reservationRoutes.reservationsUser)

//POST request route to create reservation
resRouter.post('/create', reservationRoutes.reservationCreate)

//PUT request to delete specific reservation
resRouter.delete('/delete/:id', reservationRoutes.reservationDelete)

//GET for specific user reservation
resRouter.get('/specific/:id', reservationRoutes.reservationSpecific)

//PUT for updating info 
resRouter.put('/edit', reservationRoutes.reservationEdit)

module.exports = resRouter