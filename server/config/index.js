const dotenv = require('dotenv');
const path = require('path');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Connect .env.* files ('.env.development, .env.test, ...')
const envFound = dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) });
// const envFound = dotenv.config({ path: path.resolve(process.cwd(), '.env') });
// const envFound = dotenv.config();
// console.log('path: ===> ', path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`))

if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  /**
   * Port which application listens
   */
  port: parseInt(process.env.APP_PORT, 10),

  /**
   * Connection type: local/cloud
   */
  connection_type: process.env.MONGODB_CONNECTIONTYPE,
  
  /**
   * Database name
   */
  db_name: process.env.MONGODB_NAME,

  /**
   * Database local connection settings
   */
  db_local: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    name: process.env.MONGODB_NAME,
  },

  /**
   * Database cloud connection settings
   */
  db_cloud: {
    name: process.env.MONGODB_NAME,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    uri: process.env.MONGODB_URI,
  },
  // database_name: process.env.MONGODB_NAME,
  // database_URI: process.env.MONGODB_URI,
  // database_name: JSON.parse(process.env.MONGODB_URI).name || '',
  // database_URI: JSON.parse(process.env.MONGODB_URI).URI,

  /**
   * Secret key and expiration for JWT
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtCookieExpiresIn: process.env.JWT_COOKIE_EXPERES_IN,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  }
};
