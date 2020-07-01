const dotenv = require('dotenv');
const path = require('path');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({ path: path.resolve(process.cwd(), '.env') });
// const envFound = dotenv.config();

if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  database_name: process.env.MONGODB_NAME,
  database_URI: process.env.MONGODB_URI,
  // database_name: JSON.parse(process.env.MONGODB_URI).name || '',
  // database_URI: JSON.parse(process.env.MONGODB_URI).URI,

  /**
   * Secret key for JWT
   */
  jwt_secret: process.env.JWT_SECRET,

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
