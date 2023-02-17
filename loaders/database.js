const { Sequelize } = require('sequelize');

/**
 * Database
 * 
 * @link https://sequelize.org/docs/v6/other-topics/aws-lambda/
 */
 module.exports = function (app) {
   
    if(process.env.DB_CONNECTION_URL) {

        global.sequelize  = new Sequelize(process.env.DB_CONNECTION_URL);
    }
    else {

        const database = process.env.DB_NAME || 'app';
        const username = process.env.DB_USERNAME || 'root';
        const password = process.env.DB_PASSWORD || 'root';

        const dialect = process.env.DB_DIALECT || 'mysql';
        const host = process.env.DB_HOST || '127.0.0.1';
        const port = Number(process.env.DB_PORT || 3306);

        global.sequelize =  new Sequelize(database, username, password, {
                host,
                port,
                dialect,
                logging: false,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 60000,
                    idle: 30000
                    // max: 2,
                    // min: 1,
                    // idle:10000,
                    // acquire: 3000,
                    // evict: CURRENT_LAMBDA_FUNCTION_TIMEOUT
                }
            }
        );
    }
}