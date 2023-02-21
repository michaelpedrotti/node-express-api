const Controller = require('../controllers/mainController');

module.exports = require('express').Router()
    .get('/', Controller.index);
