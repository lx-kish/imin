const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');;
const config = require('../../config');
const userModel = require('../../db/models/userModel');
// const { website } = require('../../db/schemas/educatorSchema');

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

  isAuth: (req, res, next) => {

    let token = req.cookies.access_token;

    logger.debug('Searching user with session token: %o', token);

    users.findByToken(token, (err, user) => {

      if (err) {
        let message = `User has not found due to ${err}`;
        logger.error(message);
        return res.status(400).json({ message: message });
      }

      if (!user) {
        let message = `User has not found due to wrong email or password provided`;
        logger.error(message);
        return res.status(401).send(message);
      }

      req.user = user;
      req.token = token;
      next();
    });
  },

  signUp: (req, res, next) => {
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body)

    try {
      const role = req.body.role;
      // console.log('role from signUp user routes middleware ====> ', role);
      let userModel, user;

      switch (role) {
        case 'admin':
          userModel = admins;

          user = new userModel({
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            name: req.body.name,
            surname: req.body.surname
          });
          break;
        case 'student':
          userModel = students;

          user = new userModel({
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            name: req.body.name,
            surname: req.body.surname
          });
          break;
        case 'educator':
          userModel = educators;

          user = new userModel({
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            name: req.body.name,
            surname: req.body.surname,
            company: req.body.company,
            website: req.body.website
          });
          break;
        default:
          throw new Error(`Nonidentified role: ${role}.`);
      }

      user.save((err, user) => {

        if (err) {
          logger.error(`${err} occured while saving`);
          res.status(err.status || 400).json({ message: err.message });
        } else {
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
        }
      });
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

  logOut: (req, res, next) => {
    // const logger = Container.get('logger');
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      // //@TODO AuthService.Logout(req.user) do some clever stuff
      // return res.status(200).end();
      req.user.deleteToken(req.token, (err, user) => {

        if (err) {
          let message = `${err} occured while logging out.`;
          logger.error(message);
          return res.status(400).json({ message: message });
        }

        next();
      });
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  }

};