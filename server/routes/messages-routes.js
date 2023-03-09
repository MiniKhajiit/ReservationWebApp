const express = require('express')

const messagesRoutes = require('./../controllers/messages-controller.js')

//create router
const msgRouter = express.Router()

//add route for GET request to retrieve all messages
//in server.js, messages route is specified as '/messages' - /all means /messages/all
msgRouter.get('/all', messagesRoutes.messageAll)

//add route for POST request to create new message
msgRouter.post('/create', messagesRoutes.messageCreate)

//add route for PUT request to delete specific message
msgRouter.put('/delete', messagesRoutes.messageDelete)

module.exports = msgRouter