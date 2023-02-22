module.exports = require('express').Router()
    .use('/profile', require('./profile'))
    .use('/user', require('./user'))
    .use('/', require('./routes/main'));