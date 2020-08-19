const config = require('../config');
const services = require('./services');

const { db: { name } } = config;
// const name = config.database_name;
const connectionLink = {};

module.exports = () => {

  const connection = require('../db/connections/mainDBConnection');
  connectionLink[name] = connection;
  services.set('connections', connectionLink);
}