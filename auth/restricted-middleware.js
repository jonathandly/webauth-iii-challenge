// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
    // const { username, password } = req.headers;

    // if(username && password) {
    //     Users.findBy({ username })
    //         .first()
    //         .then(user => {
    //             if(user && bcrypt.compareSync(password, user.password)) {
    //                 next();
    //             } else {
    //                 res.status(401).json({ message: 'Invalid creds' });
    //             }
    //         })
    //         .catch(err => {
    //             res.status(500).json({ message: 'Unexpected error' });
    //         });
    // } else {
    //     res.status(400).json({ message: 'No creds given' });
    // }
    const token = req.headers.authorization;

    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            res.status(401).json({ message: 'You shall not pass' });
        } else {
            req.decodedToken = decodedToken;
            next();
        }
    });
};
