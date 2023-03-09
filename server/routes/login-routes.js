const express = require('express')

const loginRoutes = require('./../controllers/login-controller')

//create Router
const loginRouter = express.Router()

//POST/GET request for login
loginRouter.post('/login', loginRoutes.userLogin)

//GET for refresh token
loginRouter.post('/refresh', loginRoutes.tokenRefresh)

//POST for Logout
loginRouter.post('/logout', loginRoutes.loginLogout)

module.exports = loginRouter