const Controller = require('../controllers/githubUserController');

module.exports = require('express').Router()
    .get('/users/:username/details', Controller.detail)    
    .get('/users/:username/repos', Controller.repos)
    .get('/users', Controller.index);