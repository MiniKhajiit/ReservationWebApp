const dotenv = require('dotenv').config();
const knex = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
const { application } = require('express');


//Email function
const verificationEmail = (userName, userEmail, userCode) => {
    //Transport config for email
    const transport = nodemailer.createTransport({
        host: 'smtp.office365.com',
        service: "Outlook365",
        port: 587,
        secureConnection: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    //Email Verification
    transport.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Please confirm your account",
        html: `<div>
                <h1>Email Confirmation</h1>
                <h2>Hello ${userName}</h2>
                <p>Thank you for making an account fellow family member. Please confirm your email by clicking on the following link!</p>
                <a href=${process.env.EMAIL_URL}/user/create/verify/${userCode}>Click here to verify new account</a>
                </div>`,
    }).catch(err => console.log(err));
};

/*const randStr = () => {
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for ( var i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}*/
const randStr = () => {
    return Math.random().toString(20).substring(2, 12)
}


//create new user--------------------------------
//actual export for userCreation method
exports.userCreate = async (req, res) => {
    const verifyCode = jwt.sign({email: req.body.email}, process.env.USER_VER_SECRET, {expiresIn: "1h"})
    const newId = randStr();
    //add new user to db
    //password is stored as an encrypted hash
    knex('users')
        .insert({
            'name': req.body.name,
            'email': req.body.email,
            'phone': req.body.phone,
            'password': await bcrypt.hash(req.body.password, 12),
            'userID': newId,
            'backgroundColor': "#000000",
            'borderColor': "#000000",
            'textColor': "ffffff",
            'verified': 0,
            'confirmationCode': verifyCode
        })
        .then(() => {
            //success message
            console.log( `User \'${req.body.name}\' created successfully`);
            //EMAIL VERIFICATION
            try {
                verificationEmail(req.body.name, req.body.email, verifyCode)
            } catch (error) {
                res.status(402)
                console.error(`There was an error sending the verification email: ${error}`)
            }
            console.log('Verification email sent successfully for new user!')
        })
        .catch((err) => {
            console.error(`There was an error creating ${req.body.name}: ${err}`);
        })
    
}
//user creation----------------------------------

//Verify the user
exports.verifyUser = async (req, res) => {
    knex('users')
        .where({confirmationCode: req.params.confirmationCode,})
        .update({verified: 1})
        .then((user) => {
            if(!user) {
                res.status(400)
                console.error("User not found")
            }
        })
}

