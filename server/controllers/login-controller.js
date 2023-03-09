const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken')
const knex = require('./../db')
const bcrypt = require('bcryptjs')

let refreshTokens = [];

const generateAccessToken = (user) => {
    return jwt.sign({ name: user.name }, process.env.LOGIN_SECRET, { expiresIn: '5m' })
}
const generateRefreshToken = (user) => {
    return jwt.sign({ name: user.name }, process.env.REFRESH_SECRET, {expiresIn: '24h' })
}
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.LOGIN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You are not authenticated");
    }
};

// LOGIN
/*exports.userLogin = async (req, res) => {
    knex('users')
    .where({name: req.body.name})
    .first()
    .then(user => {
        if (!user){
            response.status(400).json({
                error: "No user by that name (check spelling)"
            })
        } else {
            return bcrypt
            .compare(req.body.password, user.password)
            .then(isAuthenticated => {
                if(!isAuthenticated){
                    response.status(401).json({
                        error: "Unauthorized Access!"
                    })
                } else {
                    return jwt.sign(user, LOGIN_SECRET, (error, token) => {
                        response.status(200).json({token})
                    })
                }
            })
        }
    })
}
*/

// LOGIN
exports.userLogin = async (req, res) => {
    try {
        knex('users')
            .where({name: req.body.name})
            .first()
            .then(user => {
                if (
                    bcrypt.compare(req.body.password, user.password)
                ) {
                    /*const accessToken = generateAccessToken(user);
                    const refreshToken = generateRefreshToken(user);
                    refreshTokens.push(refreshToken);*/
                    res.json({
                        userID: user.userID,
                        name: user.name,
                        email: user.email,
                        //accessToken,
                        //refreshToken,
                        id: user.id,
                        phone: user.phone,
                        backgroundColor: user.backgroundColor,
                        borderColor: user.borderColor,
                        textColor: user.textColor
                    })
                } else {
                    res.status(400).json("Username or password is incorrect");
                }
            })
    } catch(err) {console.error(`User does not exist?: ${err}`)}
};

//POST for Login request
/*exports.userLogin = async (request, response) => {
    knex('users')
        .where({name: request.body.name })
        .first()
        .then(retrievedUser => {
            if (retrievedUser.verified == 0) throw new Error("Account unverified")
            if(!retrievedUser) throw new Error("User not found")
            return Promise.all([
                bcrypt.compare(request.body.password, retrievedUser.password),
                Promise.resolve(retrievedUser)
            ]).then(results => {
                const areSamePasswords = results[0]
                if(!areSamePasswords) throw new Error("wrong Password!")
                const user = results[1]
                const payload = {name: user.name}
                jwt.sign(payload, process.env.LOGIN_SECRET, (error, token) => {
                    if(error) throw new Error("Sign in error!")
                    response.json({token, user})
                })?.catch(error => {
                    console.error(error)
                })
            });
        });
};
*/


// POST for token refresh
exports.tokenRefresh = async (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid!");
    } 

    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
    
        refreshTokens.push(newRefreshToken);
    
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
      });
    
      //if everything is ok, create new access token, refresh token and send to user
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

// POST for logout
exports.loginLogout = async (req, res) => {
    try {verifyToken();} catch (err) {console.error(err)}
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== token);
    res.status(200).json("Fly, you fools!");
}