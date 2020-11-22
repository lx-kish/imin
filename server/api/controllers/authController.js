const { promisify } = require('util');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require('../../config');
const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');
// const userModel = require('../../db/models/userModel');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
// const factory = require('./handlerFactory');

const { db: { name } } = require('../../config');
// // console.log(services);
// const dbName = config.database_name;
// // const connection = services.get('connections')[dbName];
const connection = services.get('connections')[name];
// const model = userModel(connection);
// const users = model.users;
// const admins = model.admins;
// const students = model.students;
// const educators = model.educators;

/**
 * Important! If you opened a separate connection using 
 * mongoose.createConnection() but attempt to access 
 * the model through mongoose.model('ModelName') 
 * it will not work as expected since it is not hooked up 
 * to an active db connection. 
 * In this case access your model through the connection you created.
 * https://github.com/Automattic/mongoose/blob/master/README.md
 */
const users = connection.model('user');
const admins = connection.model('admin');
const students = connection.model('student');
const educators = connection.model('educator');

const signToken = id => {
  return jwt.sign(
    { id },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
};

const generateAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + config.jwtCookieExpiresIn * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwareded-proto'] === 'https'
  };
  
  // removes password from the output
  user.password = undefined;
  user.passwordConfirm = undefined;

  res.cookie('access_token', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
}

module.exports = {

  isAuth: catchAsync(async (req, res, next) => {

    /** Getting a token and checking if it exists */
    let token = req.cookies.access_token;

    if (!token) {
      return next(new AppError(`You are trying to reach restricted resource! Please authorize to get access!`, 401));
    }

    logger.debug('Searching user with session token: %o', token);

    /** Verifying a token */
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    /** Checking if user still exist */
    const currentUser = await users.findById(decoded.id);
    if (!currentUser) return next(new AppError('The user does no longer exist.', 401));

    /** Checking if user changed password after jwt was issued */
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError('Changing password is detected, please relogin.', 401));
    }

    logger.debug(`User ${currentUser._id} has been identified as logged in`);

    /** Grant access to protected route */
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }),

  /** The route is called after isAuth route, so will contain req.user in it */
  isPermitted: (...roles) => {
    return (req, res, next) => {
      // roles ['admin', 'lead-guide'], role='user'
      if (!roles.includes(req.user.role)) {
        return next(new AppError('You do not have a permission to perform this action', 403));
      }
      next();
    }
  },
  // isPermitted: (req, res, next) => {

  //   if (req.user.role !== 'admin') {
  //     return next(new AppError('You do not have a permission to perform this action', 403));
  //   }
  //   next();
  // },

  signUp: catchAsync(async (req, res, next) => {
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body)

    const role = req.body.role;
    let userModel;

    const user = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      phone: req.body.phone,
      name: req.body.name,
      surname: req.body.surname
    };

    switch (role) {
      case 'admin':
        userModel = admins;
        break;
      case 'student':
        userModel = students;
        break;
      case 'educator':
        userModel = educators;

        user.company = req.body.company;
        user.website = req.body.website;
        break;
      default:
        return new AppError(`Unidentified role: ${role}.`, 400);
    }

    let newUser = await userModel.create(user);

    // console.log('userModel ===> ', userModel);
    // console.log('role "role" ===> ', role);
    // console.log('role "req.body.role" ===> ', req.body.role);
    // console.log('role newUser.role ===> ', newUser.role);

    if (!newUser) return next(new AppError(`Error occured while user saving`, 400));

    generateAndSendToken(newUser, 201, req, res);
  }),

  signIn: catchAsync(async (req, res, next) => {

    logger.debug('Calling Sign-In endpoint with body: %o', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Bad email or password provided!', 400));
    }

    const userModel = users;

    const user = await userModel.findOne({ email }).select('password');

    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError('Incorrect email or password!', 401));
    }

    logger.debug('Found user at Sign-In endpoint with properties:', user);

    generateAndSendToken(user, 200, req, res);
  }),

  logOut: async (req, res, next) => {
    // const logger = Container.get('logger');
    logger.debug('Calling Sign-Out endpoint');

    res.cookie('access_token', '');

    res.status(204).json({
      status: 'success',
      data: null
    });
  }

};