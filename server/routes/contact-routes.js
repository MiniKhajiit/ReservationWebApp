const express = require('express')

const contactRoutes = require('./../controllers/contact-controller')

//create router
const contactRouter = express.Router()

//POST request to send email
contactRouter.post('/email', contactRoutes.contactEmail)

module.exports = contactRouter