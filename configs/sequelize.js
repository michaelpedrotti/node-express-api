const environment = process.env.NODE_ENV || 'development';
let configs = {};

if(process.env.DB_CONNECTION_URL){

  configs[environment] = {
    'url': process.env.DB_CONNECTION_URL // mysql://root:root@dbhost:3306/app
  };
}
else {

  configs[environment] = {
    'dialect': process.env.DB_DIALECT || 'mysql',
    'username': process.env.DB_USERNAME || 'root',
    'password': process.env.DB_PASSWORD || 'root',
    'database': process.env.DB_NAME || 'app',
    'host': process.env.DB_HOST || 'dbhost',
    'port': Number(process.env.DB_PORT || 3306)
  };
}

module.exports = configs;