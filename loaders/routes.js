/**
 * Routes
 */
 module.exports = function (app) {

    app.use('/user', require('../routes/user'));
    app.use('/profile', require('../routes/profile'));
    app.use('/permission', require('../routes/permission'));
    app.use('/', require('../routes/main'));
}