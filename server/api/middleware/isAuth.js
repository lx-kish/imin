// const User = require('../../db/models/userModel');
const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');
// const model = require('../../db/models/userModel');
const config = require('../../config');

// const mongoose = require('mongoose');

const dbName = config.database_name;
const connection = services.get('connections')[dbName];
// const userModel = model(connection);
// const monoModel = require('../../db/models/monoModel');
// try {
//   const userModel = monoModel(connection);

// } catch (e) {
//   console.log(e)
// }
const userModel = connection.model('users');
// const userModel = connection.model('users');

module.exports = (req, res, next) => {

  let token = req.cookies.access_token;

  logger.debug('Searching user with session tokeny: %o', token);

  userModel.findByToken(token, (err, user) => {

    if (err) {
      let message = `User has not found due to ${err}`;
      logger.error(message);
      return res.status(400).json({ message: message });
    }
    
    if (!user) {
      let message = `User has not found due to wrong email or password provided`;
      logger.error(message);
      return res.status(401).send(message);
    }

    req.user = user;
    req.token = token;
    next();
  });
};