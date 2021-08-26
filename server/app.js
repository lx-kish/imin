const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const config = require('./config');
const logger = require('./loaders/logger')();
const routes = require('./api/index');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./api/controllers/errorController');

const path = require('path');


const app = express();

module.exports = () => {

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  //SEt security HTTP headers
  app.use(helmet());

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());
  app.options('*', cors());
  // app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

  // Middleware that transforms the raw string of req.body into json
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true })); 
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  app.use(cookieParser());

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(xss());

  // Prevents parameter pollution
  app.use(hpp({
    whitelist: ['']
  }));

  // Limits requests from the same API
  // allow 100 requests from one IP per hour
  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });

  app.use(compression());

  app.use(config.api.prefix, limiter);
  // console.log('config.api.prefix ===> ', config.api.prefix);

  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.all('/status', (req, res) => {
    res.status(200).json({
      message: 'Ok'
    });
  });

  // Load API routes
  app.use(config.api.prefix, routes());

  // Serve React.js frontend
  app.use(express.static(path.join("client/build")));
  
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });

  // catch 404 and forward to error handler
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });

  // process all the errors in a single source
  app.use(globalErrorHandler);

  return app;
};