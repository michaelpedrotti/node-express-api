const { userValidator } = require('../validators/userValidator');
const Controller = require('../controllers/userController');

module.exports = require('express').Router()
    .delete('/:id', Controller.delete)
    .put('/:id', userValidator, Controller.update)
    .get('/:id/edit', Controller.edit)
    .get('/new', Controller.new)
    .get('/:id', Controller.show)
    .post('/', userValidator, Controller.create)
    .get('/', Controller.index);
