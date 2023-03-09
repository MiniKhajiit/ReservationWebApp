//Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const path = require('path');
    //authentication dep's
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
    //image upload



//Import routes
const messagesRouter = require('./routes/messages-routes');
const reservationRouter = require('./routes/reservation-routes');
const usersRouter = require('./routes/users-routes');
const signupRouter = require('./routes/signup-routes');
const loginRouter = require('./routes/login-routes-new');
const contactRouter = require('./routes/contact-routes');
const profileEditRouter = require('./routes/profile-edit-routes');
const availabilityRouter = require('./routes/availability-routes');
//const imageRouter = require('./routes/image-routes');
const { Database } = require('sqlite3');

//Creates the app and default port
const app = express();
const PORT = process.env.PORT || 8701;

//Pick up React's index.html file
app.use(express.static(path.join(__dirname, "./client/build")));

//Apply middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//Implement routes
app.use('/messages', messagesRouter)
app.use('/reservation', reservationRouter)
app.use('/users', usersRouter)
app.use('/signup', signupRouter)
app.use('/login', loginRouter)
app.use('/contact', contactRouter)
app.use('/profile', profileEditRouter)
app.use('/availability', availabilityRouter)
//app.use('/image', imageRouter);

// Display React app if no other routes are called
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,))
})
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

//500 error route
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something is broken')
})
//404 error route
app.use(function (req, res, next) {
    res.status(404).send('Sorry we could not find that')
})

// START EXPRESS APP
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})



//'$ npm run dev' To run the development version