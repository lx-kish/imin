const express = require('express');

const Logger = require('./loaders/logger')();

const config = require('./config');

const gracefulExit = require('./db/connections/gracefulExit');

// console.log(rocess.env.PORT);

async function startServer() {

    const app = express();

    await require('./loaders')(app);

    app.listen(config.port, err => {
        if (err) {
            Logger.error(err);
            process.exitCode = 1;
            return;
        }

        Logger.info(`
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