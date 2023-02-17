const express = require('express');
const loaders = require('./loaders');
const app = express();

loaders(app, express);

module.exports = app;
