const winston = require('winston');
const config = require('../config');

/** Singleton is used to allow to call the module from different
* places and get the same logger instance everywhere instead of
* creating a new instance each time we need to log something.
* One instance for the whole app.
* @TODO - expand initiating Winstone to let chouse the options.
*/

let logger;

const initLogger = () => {

  const transports = [];
  if (process.env.NODE_ENV !== 'development') {
    transports.push(
      new winston.transports.Console()
    )
  } else {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.cli(),
          winston.format.splat(),
        )
      })
    )
  }

  logger = winston.createLogger({
    level: config.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    transports
  });

}

module.exports = () => {
  if (!logger) initLogger();
  return logger;
};