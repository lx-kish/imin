const config = require('../config');
const services = require('./services');
/**Start */
const userModel = require('../db/models/userModel');
const logger = require('./logger')();
/**End */

const name = config.db_name;
// const { name } = config.db_local;
// const { db_local: { name } } = config;

const connectionLink = {};

module.exports = () => {

  const connection = require('../db/connections/mainDBConnection');
  /**Start */
  const model = userModel(connection);
  logger.info('✌️ "user" model with discriminators "admin", "educator" and "student" are initiated!');
  /**End */

  connectionLink[name] = connection;
  services.set('connections', connectionLink);
}