const express = require('express')

const signupRoutes = require('./../controllers/signup-controller')

//create router
const signupRouter = express.Router()

//POST request route to create user
signupRouter.post('/create', signupRoutes.userCreate)

//GET request for verifiication and receive response to verifiy
signupRouter.get('/user/create/verify/:confirmationCode', signupRoutes.verifyUser)


module.exports = signupRouter