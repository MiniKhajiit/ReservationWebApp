const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken')
const knex = require('./../db')
const bcrypt = require('bcryptjs')

exports.userLogin = async (req, res) => {
    knex('users')
    .where({name: req.body.name})
    .first()
    .then(async user => {
        if (!user) {
            res.status(400).json({ error: "User does not exist (check spelling)" })
        } else if (user.verified == 0) {
            res.status(400).json({ error: "user is unverified (check your email for verification link)"})
        } else {
            const pwCompare = await bcrypt.compare(req.body.password, user.password)
            const pwTest = await bcrypt.hash("asdf", 12)
            return Promise.all([
                bcrypt.compare(req.body.password, user.password),
                Promise.resolve(user)
            ]).then(result => {
                console.log(`${pwCompare}`)
                const areSamePasswords = result[0];
                const retrievedUser = result[1];
                if (!areSamePasswords) {
                    res.status(400).json({ error: "Incorrect password" })
                } else {
                    const loginToken = jwt.sign({
                        data: retrievedUser
                        }, process.env.LOGIN_SECRET,
                        { expiresIn: '24h' });
                    res.json({
                        loginToken: loginToken, 
                        userID: retrievedUser.userID,
                        name: retrievedUser.name,
                        email: retrievedUser.email,
                        id: retrievedUser.id,
                        phone: retrievedUser.phone,
                        backgroundColor: retrievedUser.backgroundColor,
                        borderColor: retrievedUser.borderColor,
                        textColor: retrievedUser.textColor
                    })
                }
            })
        }
    })
};

exports.verifyLogin = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.LOGIN_SECRET, (error, decodedToken) => {
        if (error) {
            res.status(401).json({
                message: "Unauthroized Access!"
            })
        } else {
            res.status(200).json({
                id: decodedToken.id,
                name: decodedToken.name
            })
        }
    })
};