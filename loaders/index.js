const routes = require('./routes');
const config = require('./config');
const database = require('./database');

module.exports = function(app, express){

    config(app, express);

    routes(app);

    database(app);
}