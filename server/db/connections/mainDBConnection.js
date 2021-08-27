const dbConnectionFactory = require('../connectionFactory');
const logger = require('../../loaders/logger')();
const config = require('../../config');

const connectionType = config.connection_type;
const name = config.db_name;

const { host, port } = config.db_local;

const { username, password, uri } = config.db_cloud;
// const { db_local: { host, port, name } } = config;
const dbUrl = 
    connectionType === 'cloud' ? 
    uri
        .replace('<USERNAME>', username)
        .replace('<PASSWORD>', password)
        .replace('<NAME>', name)
    :
    `mongodb://${host}:${port}/${name}`;
// const dbUrl = `mongodb://${host}:${port}/${name}`;
// const dbUrl = config.database_URI;

// Establish connection to DB
const connection = dbConnectionFactory(dbUrl);

// DB connection initialization service messages:
// When the connection established
connection.on("open", () => {
    logger.info(`✌️ Connection to database ${dbUrl} established`);
});

// When the connection throws an error
connection.on("error", (err) => {
    logger.error(`🔥 error: Failed to connect to database ${dbUrl} on startup: %o`, err);
});

// When the connection is disconnected
connection.on('disconnected', () => {
    logger.info(`Connection to database ${dbUrl} terminated`);
});

module.exports = connection;