const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.add(user)
        .then(save => {
            res.status(201).json(save);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}`, token });
            } else {
                res.status(401).json({ message: 'You shall not pass' });
            }
        })
        .catch(err => res.status(500).json(err));
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        // username: user.username,
    }

    const options = {
        expiresIn: '1h',
    }

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
