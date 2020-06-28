const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

const Logger = require('./logger')();


module.exports = async (app) => {

  if(await mongooseLoader()) {
    Logger.info('✌️ DB loaded and connected!');
  }

  if(await expressLoader(app)) {
    Logger.info('✌️ Express loaded');
  }
};