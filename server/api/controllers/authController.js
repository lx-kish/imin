const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const config = require('../../config');
const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');;
const userModel = require('../../db/models/userModel');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

const { db: { name } } = require('../../config');
// console.log(services);
// const dbName = config.database_name;
// const connection = services.get('connections')[dbName];
const connection = services.get('connections')[name];
const model = userModel(connection);
const users = model.users;
const admins = model.admins;
const students = model.students;
const educators = model.educators;

const signToken = id => {
  return jwt.sign(
    { id },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
}

module.exports = {

  isAuth: catchAsync(async (req, res, next) => {

    /**
     * Getting a token and checking if it exists
     */
    let token = req.cookies.access_token;

    if (!token) {
      return next(new AppError(`You are trying to reach restricted resource! Please authorize to get access!`, 401));
    }

    logger.debug('Searching user with session token: %o', token);

    /**
     * Verifying a token
     */
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    /**
     * Checking if user still exist
     */
    const currentUser = await user.findById(decoded.id);
    if (!currentUser) return next(new AppError('The user does no longer exist.', 401));

    /**
     * Checking if user changed password after jwt was issued
     */
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError('Changing password is detected, please relogin.', 401));
    }

    logger.info(`User ${currentUser._id} has been identified as logged in`);

    /**
     * Grant access to protected route
     */
    req.user = currentUser;
    next();
  }),

  /**
   * The route is called after isAuth route, so will contain req.user in it
   */
  isPermitted: (req, res, next) => {

    if (req.user.role !== 'admin') {
      return next(new AppError('You do not have a permission to perform this action', 403));
    }
    next();
  },

  signUp: catchAsync(async (req, res, next) => {
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body)

    const role = req.body.role;
    let userModel, user;

    switch (role) {
      case 'admin':
        userModel = admins;

        user = {
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          name: req.body.name,
          surname: req.body.surname
        };
        break;
      case 'student':
        userModel = students;

        user = {
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          name: req.body.name,
          surname: req.body.surname
        };
        break;
      case 'educator':
        userModel = educators;

        user = {
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          name: req.body.name,
          surname: req.body.surname,
          company: req.body.company,
          website: req.body.website
        };
        break;
      default:
        return new AppError(`Unidentified role: ${role}.`, 400);
    }

    let newUser = await userModel.create(user);

    if (!newUser) return next(new AppError(`Error occured while user saving`, 400));

    const token = signToken(newUser._id);
    // newUser = await newUser.generateToken();

    // if (!newUser) return next(new AppError(`Error occured while generating token`, 400));

    res.cookie('access_token', token, {
      // domain: 'http://localhost:3000/signup',
      sameSite: 'none',
      httpOnly: true,
      secure: true
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
    // logger.error('🔥 Error attaching user to req: %o', e);
  }),

  signIn: catchAsync(async (req, res, next) => {

    logger.debug('Calling Sign-In endpoint with body: %o', req.body)
    // try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Bad email or password provided!', 400));
    }

    const userModel = users;

    // const user = await userModel.findOne({ email: email });
    const user = await userModel.findOne({ email }).select('password');

    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError('Incorrect email or password!', 401));
    }
    // if (err) {
    //   let message = `${err} occured while logging in.`;
    //   logger.error(message);
    //   return res.status(400).json({ message: message });
    // };

    // if (!user) {
    //   return next(new AppError(`Email ${email} hasn't registered in the database`, 400));
    //   // let message = `Email ${email} hasn't registered in the database`;
    //   // logger.error(message);
    //   // return res.status(400).json({ message: message });
    // };

    // const isMatch = await user.comparePassword(password, user.password);

    // if (!isMatch) return next(new AppError(`Wrong password provided!`, 400));
    const token = signToken(user._id);

    res.cookie('access_token', token, {
      // domain: 'http://localhost:3000/signup',
      sameSite: 'none',
      httpOnly: true,
      secure: true
    });

    res.status(200).json({
      status: 'success',
      token
    });

    // user.generateToken((err, user) => {
    //   if (err) {
    //     let message = `${err} occured while logging in.`;
    //     logger.error(message);
    //     return res.status(400).json({ message: message });
    //   }

    //   req.user = user;
    //   req.token = user.access_token;
    //   next();
    // });
    // });

    // } catch (e) {
    //   logger.error('🔥 error: %o', e);
    //   return next(e);
    // }
  }),

  logOut: async (req, res, next) => {
    // const logger = Container.get('logger');
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    // try {
    // //@TODO AuthService.Logout(req.user) do some clever stuff
    // return res.status(200).end();
    const user = await req.user.deleteToken(req.token);//, (err, user) => {

    // if (err) {
    //   let message = `${err} occured while logging out.`;
    //   logger.error(message);
    //   return res.status(400).json({ message: message });
    // }
    if (!user) {
      return next(new AppError(`User has not found due to wrong email or password provided`, 401));
    }

    // next();
    logger.info(`User ${req.user._id} has been successfully logged out`);
    res.status(200).cookie('access_token', '', {
      sameSite: 'none',
      httpOnly: true,
      secure: true
    }).send('ok');
    //   });
    // } catch(e) {
    //   logger.error('🔥 error %o', e);
    //   return next(e);
    // }
  }

};