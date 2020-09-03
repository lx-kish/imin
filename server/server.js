const config = require('./config');
const logger = require('./loaders/logger')();
const mongooseLoader = require('./loaders/mongoose');
/**Start */
const services = require('./loaders/services');
const userModel = require('./db/models/userModel');

const { db: { name } } = require('./config');
/**End */
if (mongooseLoader()) {
    logger.info('✌️ DB loaded and connected!');
}
/**Start */

const connection = services.get('connections')[name];
const model = userModel(connection);
logger.info('✌️ "user" model with discriminators "admin", "educator" and "student" are initiated!');
/**End */

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

// If the Node process ends, close all the Mongoose connections
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

module.exports = app;