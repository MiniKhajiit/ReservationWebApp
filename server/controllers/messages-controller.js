const knex = require('./../db')

//retrieve all the messages
exports.messageAll = async (req, res) => {
    //get all messages from db
    knex
        .select('*')
        .from('messages') //the 'messages' table
        .then(msgData => {
            res.json(msgData)
        })
        .catch(err => {
            res.json({ message: `There was an error retrieving messages: ${err}`})
        })
}

//create new message
exports.messageCreate = async (req, res) => {
    //add new message to db
    knex('messages')
        .insert({
            'author': req.body.author,
            'mssg': req.body.mssg,
        })
        .then(() => {
            //send success message
            res.json({ message: `Message by \'${req.body.author}\' created`})
        })
        .catch(err => {
            res.json({ message: `There was an error creating \"${req.body.author}\'s\" message.`})
        })
}

//delete a message
exports.messageDelete = async (req, res) => {
    //find specific message and delete it
    knex('messages')
        .where('id', req.body.id)
        .del()
        .then(() => {
            res.json({ message: `Message ${req.body.id} by \'${req.body.author} deleted`})
        })
        .catch(err => {
            res.json({ message: `There was an error deleting message ${req.body.id} by \'${req.body.author}`})
        })
}