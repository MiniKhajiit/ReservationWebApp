const express = require('express')

const loginRoutes = require('./../controllers/login-controller-new')

//create Router
const loginRouter = express.Router()

//POST/GET request for login
loginRouter.post('/login', loginRoutes.userLogin)

//GET verification for login
loginRouter.get('/verify', loginRoutes.verifyLogin)

module.exports = loginRouter