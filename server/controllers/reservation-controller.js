const knex = require('./../db')

//retrieve all reservations
exports.reservationAll = async (req, res) => {
    //get all reservations from db
    knex
        .select('*')
        .from('reservation')
        .then(resData => {
            res.json(resData)
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving reservations: ${err}`})
        })
}

//retrieve reservations for specific user
exports.reservationsUser = async (req, res) => {
    knex('reservation')
        .select('*')
        .where('author', req.params.author)
        .then(resUserData => {
            res.json(resUserData)
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving user reservation: ${err}`})
        })
}

//create new reservation
exports.reservationCreate = async (req, res) => {
    //add new res to db
    knex('reservation')
        .insert({
            'title': req.body.title,
            'author': req.body.author,
            'start': req.body.start,
            'end': req.body.end,
            'description': req.body.description,
            'backgroundColor': req.body.backgroundColor,
            'borderColor': req.body.borderColor,
            'textColor': req.body.textColor,
            'room': req.body.room,
            'boyBunkBeds': req.body.boyBunkBeds,
            'girlBunkBeds': req.body.girlBunkBeds
        })
        .then(() => {
            //success message
            res.json({ message: `Reservation \'${req.body.title}\' created successfully`})
        })
        .catch(err => {
            res.json({ message: `There was an error creating \'${req.body.title}`})
        })
}

//delete a reservation
exports.reservationDelete = async (req, res) => {
    //find specific res and delete it
    knex('reservation')
        .where('id', req.params.id)
        .del()
        .then(() => {
            res.json({ message: `Reservation ${req.body.title} deleted`})
        })
        .catch(err => {
            res.json({ message: `There was an error deleting reservation ${req.body.title}`})
        })
}

//GET specific reservation
exports.reservationSpecific = async (req, res) => {
    knex('reservation')
        .select('*')
        .where('id', req.params.id)
        .then(resSpecificData => {
            res.json(resSpecificData)
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving specific reservation: ${err}`})
        })
}

//edit a reservation
exports.reservationEdit = async (req, res) => {
    knex('reservation')
        .where('id', req.body.id)
        .update({
            'title': req.body.title,
            'start': req.body.start,
            'end': req.body.end,
            'description': req.body.description,
            'room': req.body.room,
            'boyBunkBeds': req.body.boyBunkBeds,
            'girlBunkBeds': req.body.girlBunkBeds
        })
        .then(resData => {
            res.json(resData)
        })
        .catch(err => {
            res.json(err)
        })
}