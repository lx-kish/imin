// const User = require('../../db/models/userModel');
const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');
const model = require('../../db/models/userModel');
const config = require('../../config');

const dbName = config.database_name;
const connection = services.get('connections')[dbName];
const userModel = model(connection);

module.exports = (req, res, next) => {
  console.log(req.cookies)
  let token = req.cookies.access_token;
  // console.log(req.headers.cookie);
  // console.log(req.cookie);



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