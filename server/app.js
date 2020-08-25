const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config');
const logger = require('./loaders/logger')();
const routes = require('./api/index');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/errorController');


const app = require('express')();

module.exports = () => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.all('/status', (req, res) => {
    res.status(200).json({
      message: 'Ok'
    });
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  //@TODO - do I need it here???
  //https redirect
  // app.use(function (req, res, next) {

  //   res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');
  //   if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
  //     return res.redirect(301, 'https://' + req.hostname + req.url);
  //   } else {
  //     logger.info("HTTPS call detected");
  //     return next();
  //   }
  // });

  /**allow CORS (for development purposes only, disable in production)
  * (https://stackoverflow.com/questions/18642828/origin-origin-is-not-allowed-by-access-control-allow-origin)
  */
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  //   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X - PINGOTHER, Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Authorization');
  //   next();
  // });

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  // app.use(cors());
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

  // Handle CORS pre-flight reqests (https://stackoverflow.com/questions/54845053/express-react-with-cors-setting-http-only-secure-cookie-for-react-spa)
  // app.options('*', cors());
  // cors({credentials: true, origin: 'http://localhost:3000'});

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  // app.use(require('method-override')());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  app.use(cookieParser());

  // Load API routes
  app.use(config.api.prefix, routes());

  // catch 404 and forward to error handler
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });

  // /// catch 404 and forward to error handler
  // app.all('*', (req, res, next) => {
  //   const err = new Error(`Can't find ${req.originalUrl} on the server`);
  //   err.status = 'fail';
  //   err.statusCode = 404;
  //   next(err);
  // });

  /// error handlers
  // app.use((err, req, res, next) => {
  //   /**
  //    * Handle 401 thrown by express-jwt library
  //    */
  //   if (err.name === 'UnauthorizedError') {
  //     return res
  //       .status(err.status)
  //       .json({ message: err.message })
  //       .end();
  //   }
  //   return next(err);
  // });

  app.use(globalErrorHandler);

  return app;
};