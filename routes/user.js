const { isAuthenticated } = require('../middlewares/authenticationMiddleware');
const { isAuthorized } = require('../middlewares/authorizationMiddleware');
const { userValidator } = require('../validators/userValidator');
const Controller = require('../controllers/userController');

module.exports = require('express').Router()
    .delete('/:id', isAuthenticated, isAuthorized('user', 'delete'), Controller.delete)
    .put('/:id', isAuthenticated, isAuthorized('user', 'update'), userValidator, Controller.update)
    .get('/:id/edit', isAuthenticated, isAuthorized('user', 'update'), Controller.edit)
    .get('/new', isAuthenticated, isAuthorized('user', 'create'), Controller.new)
    .get('/:id', isAuthenticated, isAuthorized('user', 'read'), Controller.show)
    .post('/', isAuthenticated, isAuthorized('user', 'create'), userValidator, Controller.create)
    .get('/', isAuthenticated, isAuthorized('user', 'read'), Controller.index);
