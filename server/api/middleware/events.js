const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');;
const config = require('../../config');
const eventModel = require('../../db/models/eventModel');

const { db: { name } } = config;
// console.log(services);
// const dbName = config.database_name;
// const connection = services.get('connections')[dbName];
const connection = services.get('connections')[name];
const events = eventModel(connection);

module.exports = {

  // isAuth: (req, res, next) => {

  //   let token = req.cookies.access_token;

  //   logger.debug('Searching user with session token: %o', token);

  //   users.findByToken(token, (err, user) => {

  //     if (err) {
  //       let message = `User has not found due to ${err}`;
  //       logger.error(message);
  //       return res.status(400).json({ message: message });
  //     }

  //     if (!user) {
  //       let message = `User has not found due to wrong email or password provided`;
  //       logger.error(message);
  //       return res.status(401).send(message);
  //     }

  //     req.user = user;
  //     req.token = token;
  //     next();
  //   });
  // },

  create: async (req, res, next) => {
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body)

    try {
      const role = req.body.event;

      event = new events({
        hoster: [req.body.hoster],
        name: req.body.name,
        industry: req.body.industry,
        skill: req.body.skill,
        capacity: req.body.capacity,
        start: new Date(req.body.start),
        end: new Date(req.body.end),
        time: req.body.time,
        city: req.body.city,
        address: req.body.address,
        registered: undefined,
        approved: undefined,
        approver: undefined
      });

      await event.save((err, event) => {

        if (err) {
          logger.error(`${err} occured while saving new event ${req.body.name}`);
          res.status(err.status || 400).json({ message: err.message });
        }

        req.event = event;
        next();

      });
    } catch (e) {
      logger.error('🔥 Error attaching event to req: %o', e);
      return next(e);
    }
    // },

    // logOut: (req, res, next) => {
    //   // const logger = Container.get('logger');
    //   logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    //   try {
    //     // //@TODO AuthService.Logout(req.user) do some clever stuff
    //     req.user.deleteToken(req.token, (err, user) => {

    //       if (err) {
    //         let message = `${err} occured while logging out.`;
    //         logger.error(message);
    //         return res.status(400).json({ message: message });
    //       }

    //       next();
    //     });
    //   } catch (e) {
    //     logger.error('🔥 error %o', e);
    //     return next(e);
    //   }
  }

};