// const express = require('express');
const config = require('./config');
const logger = require('./loaders/logger')();
const mongooseLoader = require('./loaders/mongoose');

if (mongooseLoader()) {
    logger.info('✌️ DB loaded and connected!');
}

const gracefulExit = require('./db/connections/gracefulExit');

const app = require('./loaders/express')();

// function startServer() {

app.listen(config.port, err => {
    if (err) {
        logger.error(err);
        process.exitCode = 1;
        return;
    }

    logger.info(`
         #####################################
         🛡️  Server listening on port: ${config.port} 🛡️ 
         #####################################
        `);
});

// If the Node process ends, close all the Mongoose connections
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

// }

// startServer();

// module.exports = startServer.server;
module.exports = app;