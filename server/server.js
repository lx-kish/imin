const config = require('./config');
const logger = require('./loaders/logger')();
const mongooseLoader = require('./loaders/mongoose');

process.on('uncaughtException', err => {
    console.log(`UNCAUGHT EXCEPTION! APPLICATION IS SHUTTING DOWN`);
    console.log(err.name, err.message);
    process.exit(1);
});

mongooseLoader()
logger.info('✌️ DB loaded and connected!');

const gracefulExit = require('./db/connections/gracefulExit');

const app = require('./app')();

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

process.on('unhandledRejection', err => {
    console.log(`UNHANDLED REJECTION! APPLICATION IS SHUTTING DOWN`);
    console.log(err);
    // graceful exit:
    server.close(() => {
        process.exit(1);
    });
});

// If the Node process ends, close all the Mongoose connections
process
    .on('SIGINT',
        gracefulExit,
        () => {
            console.log('SIGTERM RECEIVED. Shutting down gracefully');
            server.close(() => {
                console.log('Process terminated.');
            });
        })
    .on('SIGTERM',
        gracefulExit,
        () => {
            console.log('SIGTERM RECEIVED. Shutting down gracefully');
            server.close(() => {
                console.log('Process terminated.');
            });
        });

module.exports = app;