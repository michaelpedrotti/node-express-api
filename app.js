const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const { database } = require('./helpers/connectionHelper');
const ErrorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');
const app = express();

//=================================================================
// Config
//=================================================================
// https://expressjs.com/en/resources/middleware/cors.html
app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(ErrorHandlingMiddleware.register);
//=================================================================
// Connections
//=================================================================
global.sequelize = database();
//@todo: redis

//=================================================================
// Routes
//=================================================================
app.use('/user', require('./routes/user'));
app.use('/profile', require('./routes/profile'));
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/main'));

module.exports = app;