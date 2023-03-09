const knex = require('./../db')
const bcrypt = require('bcryptjs')


exports.profileUpdate = async(req, res) => {
    knex('users')
        .where('name', req.body.name)
        .update({
            'email': req.body.email,
            'phone': req.body.phone,
            'backgroundColor': req.body.backgroundColor,
            'borderColor': req.body.borderColor,
            'textColor': req.body.textColor,
        })
        .then(resData => {
            res.json(resData)
        })
        .catch(err => {
            res.json(err)
        })
}

exports.pwUpdate = async(req, res) => {
    knex('users')
        .where('name', req.body.name)
        .update({
            'password': await bcrypt.hash(req.body.password, 12),            
        })
        .then(resData => {
            res.json(resData)
        })
        .catch(err => {
            res.json(err)
        })
}