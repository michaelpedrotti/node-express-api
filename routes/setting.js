const { isAuthenticated } = require('../middlewares/authenticationMiddleware');
const { settingValidator } = require('../validators/settingValidator');
const Controller = require('../controllers/settingController');

module.exports = require('express').Router({ mergeParams: true })
    .post('/', isAuthenticated, settingValidator, Controller.update)
    .get('/', isAuthenticated, Controller.edit);
