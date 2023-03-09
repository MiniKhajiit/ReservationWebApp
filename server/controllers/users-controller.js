const knex = require('./../db')

//retrieve all users
exports.usersAll = async (req, res) => {
    //get all users from db
    knex
        .select('*')
        .from('users')
        .then(resData => {
            res.json(resData)
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving users: ${err}`})
        })
}

//retrieve specific user
exports.userData = async (req, res) => {
    //get specific user data
    knex
        .where(req.body.name)
        .select()
        .from('users')
        .then(resData => {
            res.json(resData)
        })
        .catch(err => {
            res.json({ message: `There was an error retrietrieving the user: ${err}`})
        })
}

//delete a user
exports.userDelete = async (req, res) => {
    //find specific user and delete it
    knex('users')
        .where('id', req.body.id)
        .del()
        .then(() => {
            res.json({ message: `User \'${req.body.name}\' deleted`})
        })
        .catch(err => {
            res.json({ message: `There was an error deletingg user \'${req.body.name}\'`})
        })
}
