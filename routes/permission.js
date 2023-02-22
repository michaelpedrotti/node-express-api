const Controller = require('../controllers/permissionController');

module.exports = require('express').Router({ mergeParams: true })
    .delete('/:id', Controller.delete)
    .put('/:id', Controller.update)
    .get('/:id/edit', Controller.edit)
    .get('/new', Controller.new)
    .get('/:id', Controller.show)
    .post('/', Controller.create)
    .get('/', Controller.index);
