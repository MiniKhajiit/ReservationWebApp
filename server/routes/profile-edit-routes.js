const express = require('express')

const profileEditRoutes = require('./../controllers/profile-edit-controller')

//create router
const profileEditRouter = express.Router()

//PUT for profile update
profileEditRouter.put('/edit', profileEditRoutes.profileUpdate)

profileEditRouter.put('/edit/pw', profileEditRoutes.pwUpdate)

module.exports = profileEditRouter