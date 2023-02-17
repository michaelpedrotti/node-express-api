const routes = require('./routes');
const config = require('./config');
const error = require('./error');

module.exports = function(app, express){

    config(app, express);

    // error(app);

    routes(app);
}