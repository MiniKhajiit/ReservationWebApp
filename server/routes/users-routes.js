const express = require('express')

const usersRoutes = require('./../controllers/users-controller')

//create router
const usersRouter = express.Router()

//GET request for all users
usersRouter.get('/all/', usersRoutes.usersAll)

//GET request for specific user
usersRouter.get('/userData', usersRoutes.userData)

//PUT request to delete user
usersRouter.put('/delete', usersRoutes.userDelete)

module.exports = usersRouter