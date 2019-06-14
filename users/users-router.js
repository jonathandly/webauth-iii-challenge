const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
    // const { department } = req.headers;
    // Users.findBy({ department })
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(400).json({ message: 'You shall not pass' });
        });
});

module.exports = router;
