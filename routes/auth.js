const { isAuthenticated } = require('../middlewares/authenticationMiddleware');
const Controller = require('../controllers/authController');

module.exports = require('express').Router()
    .post('/login', Controller.login)
    .post('/verify', isAuthenticated, Controller.verify)
    .get('/me', isAuthenticated, Controller.me)
    .use('/setting', require('./setting'));