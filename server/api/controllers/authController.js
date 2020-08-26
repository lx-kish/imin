const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');;
const config = require('../../config');
const userModel = require('../../db/models/userModel');
const AppError = require('../../utils/appError');

const { db: { name } } = config;
// console.log(services);
// const dbName = config.database_name;
// const connection = services.get('connections')[dbName];
const connection = services.get('connections')[name];
const model = userModel(connection);
const users = model.users;
const admins = model.admins;
const students = model.students;
const educators = model.educators;

module.exports = {

  isAuth: async (req, res, next) => {

    let token = req.cookies.access_token;

    // console.log('req.cookies ===> ', req.cookies);

    logger.debug('Searching user with session token: %o', token);

    const user = await users.findByToken(token);//, (err, user) => {

    // if (err) {
    //   let message = `User has not found due to ${err}`;
    //   logger.error(message);
    //   return res.status(400).json({ message: message });
    // }

    if (!user) {
      return next(new AppError(`User has not found due to wrong email or password provided`, 401));
      // let message = `User has not found due to wrong email or password provided`;
      // // logger.error(message);
      // return res.status(401).send(message);
    }

    // req.user = user;
    // req.token = token;
    // next();

    logger.info(`User ${req.user._id} has been defined as logged in`);
    res.cookie('access_token', req.user.access_token, { 'SameSite': 'None' });//, { domain: 'localhost' });
    res.status(200).json({ auth: true, user: req.user });
    // });
  },

  signUp: async (req, res, next) => {
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body)

    try {
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
          throw new AppError(`Nonidentified role: ${role}.`, 400);
      }

      let newUser = await userModel.create(user);

      if (!newUser) return next(new AppError(`Error occured while user saving`, 400));

      newUser = await newUser.generateToken();

      if (!newUser) return next(new AppError(`Error occured while generating token`, 400));

      res.cookie('access_token', newUser.access_token, {
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

      // user.save((err, user) => {

      //   if (err) {
      //     logger.error(`${err} occured while saving`);
      //     res.status(err.status || 400).json({ message: err.message });
      //   } else {
      //     user.generateToken((err, user) => {
      //       if (err) {
      //         let message = `${err} occured while logging in.`;
      //         logger.error(message);
      //         return res.status(400).json({ message: message });
      //       }

      //       // req.user = user;
      //       // req.token = user.access_token;
      //       // next();

      //       logger.info(`User ${req.user._id} has been successfully saved into the db and logged in`);

      //       // Set the new style cookie
      //       res.cookie('access_token', req.user.access_token, {
      //         // domain: 'http://localhost:3000/signup',
      //         sameSite: 'none',
      //         httpOnly: true,
      //         secure: true
      //       });

      //       res.status(200).json({ post: true, userId: req.user._id, token: req.user.access_token });

      //     });
      //   }
      // });
    } catch (e) {
      logger.error('🔥 Error attaching user to req: %o', e);
      return next(e);
    }
  },

  signIn: (req, res, next) => {

    logger.debug('Calling Sign-In endpoint with body: %o', req.body)
    try {
      const { email, password } = req.body;

      const userModel = users;

      userModel.findOne({ email: email }, (err, user) => {
        if (err) {
          let message = `${err} occured while logging in.`;
          logger.error(message);
          return res.status(400).json({ message: message });
        };

        if (!user) {
          let message = `Email ${email} hasn't registered in the database`;
          logger.error(message);
          return res.status(400).json({ message: message });
        };

        user.comparePassword(password, (err, isMatch) => {
          if (err) throw err;
          if (!isMatch) {

            let message = `Wrong password provided!`;
            logger.error(message);
            return res.status(400).json({ message: message });
          }

          user.generateToken((err, user) => {
            if (err) {
              let message = `${err} occured while logging in.`;
              logger.error(message);
              return res.status(400).json({ message: message });
            }

            req.user = user;
            req.token = user.access_token;
            next();
          });
        });
      });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  },

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