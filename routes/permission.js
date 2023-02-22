const { isAuthenticated } = require('../middlewares/authenticationMiddleware');
const { isAuthorized } = require('../middlewares/authorizationMiddleware');
const Controller = require('../controllers/permissionController');

module.exports = require('express').Router({ mergeParams: true })
    .delete('/:id', isAuthenticated, isAuthorized('permission', 'delete'), Controller.delete)
    .put('/:id', isAuthenticated, isAuthorized('permission', 'update'), Controller.update)
    .get('/:id/edit', isAuthenticated, isAuthorized('permission', 'update'), Controller.edit)
    .get('/new', isAuthenticated, isAuthorized('permission', 'create'), Controller.new)
    .get('/:id', isAuthenticated, isAuthorized('permission', 'read'), Controller.show)
    .post('/', isAuthenticated, isAuthorized('permission', 'create'), Controller.create)
    .get('/', isAuthenticated, isAuthorized('permission', 'read'), Controller.index);
