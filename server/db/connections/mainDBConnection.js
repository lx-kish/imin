const config = require('../../config');
const dbConnectionFactory = require('../connectionFactory');
const Logger = require('../../loaders/logger')();

const dbUrl = config.database_URI;

// Establishing connection to DB
const connection = dbConnectionFactory(dbUrl);

// Initializing DB connection service messages:
// When the connection established
connection.on("open", () => {
    Logger.info(`Connection to database ${dbUrl} established`);
});

// When the connection throws an error
connection.on("error", (err) => {
    Logger.error(`Failed to connect to database ${dbUrl} on startup`, err);
});

// When the connection is disconnected
connection.on('disconnected', () => {
    Logger.info(`Connection to database ${dbUrl} terminated`);
});

module.exports = connection;