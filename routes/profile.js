const { isAuthenticated } = require('../middlewares/authenticationMiddleware');
const { isAuthorized } = require('../middlewares/authorizationMiddleware');
const Controller = require('../controllers/profileController');

module.exports = require('express').Router()
    .delete('/:id', isAuthenticated, isAuthorized('profile', 'delete'), Controller.delete)
    .put('/:id', isAuthenticated, isAuthorized('profile', 'update'), Controller.update)
    .get('/:id/edit', isAuthenticated, isAuthorized('profile', 'update'), Controller.edit)
    .get('/new', isAuthenticated, isAuthorized('profile', 'create'), Controller.new)
    .get('/:id', isAuthenticated, isAuthorized('profile', 'read'), Controller.show)
    .post('/', isAuthenticated, isAuthorized('profile', 'create'), Controller.create)
    .get('/', isAuthenticated, isAuthorized('profile', 'read'), Controller.index)
    .use('/:profile/permission', require('./permission'));
