const { isAuthenticated } = require('../middlewares/authenticationMiddleware');
const { isAuthorized } = require('../middlewares/authorizationMiddleware');
const Controller = require('../controllers/githubUserController');

module.exports = require('express').Router()
    .get('/users/:username/details', isAuthenticated, isAuthorized('github', 'read'), Controller.detail)    
    .get('/users/:username/repos', isAuthenticated, isAuthorized('github', 'read'), Controller.repos)
    .get('/users', isAuthenticated, isAuthorized('github', 'read'), Controller.index);