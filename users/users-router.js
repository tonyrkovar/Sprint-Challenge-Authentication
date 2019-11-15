const db = require('./users-model')
const router = require('express').Router();

const userAuth = require('../auth/authenticate-middleware')

router.get('/', userAuth, (req, res) => {
    return db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(400).json("invalid server request")
        })
})

module.exports = router;