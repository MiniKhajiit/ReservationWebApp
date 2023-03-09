const knex = require('./../db')

//retrieve all reservations for said room
exports.reservationList = async (req, res) => {
    //get all reservations from db
    knex
        .select('*')
        .where('room', req.params.room)
        .from('reservation')
        .then(roomResList => {
            res.json(roomResList)
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving reservations: ${err}`})
        })
}
