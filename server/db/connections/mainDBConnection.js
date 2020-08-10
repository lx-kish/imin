const dbConnectionFactory = require('../connectionFactory');
const Logger = require('../../loaders/logger')();
const config = require('../../config');

const { db: { host, port, name } } = config;
const dbUrl = `mongodb://${host}:${port}/${name}`;
// const dbUrl = config.database_URI;

// Establish connection to DB
const connection = dbConnectionFactory(dbUrl);

// DB connection initialization service messages:
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