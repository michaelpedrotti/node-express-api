'use strict'
const app = require('./app');
//=================================================================
// Config Lambda
//=================================================================
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const { createClient } = require("redis");
// const RedisStore = require("connect-redis")(session);

// Database Store - Sequelize
let sessionStore = new SequelizeStore({
    db: global.sequelize
});

// Cache Store - REDIS 
// const client = createClient({ 
//     legacyMode: true,
//     socket: {
//         'host': process.env.CACHE_HOST || '127.0.0.1',
//         'port': process.env.CACHE_PORT || 6379
//     }   
// });

// let sessionStore = new RedisStore({ client: client })

if(process.env.SECURE){
    app.set('trust proxy', 1) // trust first proxy
}

app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'keyboard-cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.SECURE ? true : false
        // maxAge: 60000
    }
}));

//=================================================================
// Express.js for AWS Lambda
//=================================================================
const awsServerlessExpress = require('aws-serverless-express')
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => { 

    awsServerlessExpress.proxy(server, event, context);
}