const services = require('../../loaders/services');
const Logger = require('../../loaders/logger')();

// Disconnecting DBs when server breaks
module.exports = () => {

    const connections = services['connections'];
    if (connections) {
        connections.forEach(connection => {
            let dbName = connection.name;
            connection.close(() => {
                Logger.info(`Mongoose connection with database ${dbName} is now terminated`);
            });
        });
        process.exitCode = 1;
    }
}