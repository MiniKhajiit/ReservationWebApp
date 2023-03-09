const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

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
// Email
exports.contactEmail = async (req, res) => {
    console.log("Email attempting to be sent");
    try {
        //request from server to user, that verifies upon their response
        transport.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Someone's got a question",
            html: `<div>
                    <h1>Contact Form Inquiry</h1>
                    <h2>Email from <b>${req.body.author}</b></h2>
                    <h2>Return address: <b>${req.body.email}</b></h2>
                    <p>${req.body.message}</p>
                    </div>`,
        }).catch(err => console.log(err));
        console.log("Email sent successfully")
    } catch (error) {
        console.error(`Could not send email: ${error}`)
    }
}