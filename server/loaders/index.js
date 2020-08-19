const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

const Logger = require('./logger')();


module.exports = (app) => {

  if(mongooseLoader()) {
    Logger.info('✌️ DB loaded and connected!');
  }

  if(expressLoader(app)) {
    Logger.info('✌️ Express loaded');
  }
};