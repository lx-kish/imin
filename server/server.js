const express = require('express');

const logger = require('./loaders/logger')();

const config = require('./config');

const gracefulExit = require('./db/connections/gracefulExit');

// console.log(rocess.env.PORT);

async function startServer() {

    const app = express();

    await require('./loaders')(app);

    app.listen(config.port, err => {
        if (err) {
            logger.error(err);
            process.exitCode = 1;
            return;
        }

        logger.info(`
         ################################################
         🛡️  Server listening on port: ${config.port} 🛡️ 
         ################################################
        `);
    });

    // If the Node process ends, close all the Mongoose connections
    process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

}

startServer();

// module.exports = startServer.app;