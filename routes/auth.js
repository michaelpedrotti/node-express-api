const Controller = require('../controllers/authController');

module.exports = require('express').Router()
    .post('/login', Controller.login)
    .post('/verify', Controller.verify);