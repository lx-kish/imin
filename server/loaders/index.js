const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

const Logger = require('./logger')();

module.exports = () => {

  // const app = expressLoader();

  if(mongooseLoader()) {
    Logger.info('✌️ DB loaded and connected!');
  }

  if(expressLoader()) {
    Logger.info('✌️ Express loaded');
  }

  return expressLoader;
};