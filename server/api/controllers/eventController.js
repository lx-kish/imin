const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');;
const config = require('../../config');
const eventModel = require('../../db/models/eventModel');
const catchAsync = require('../../utils/catchAsync');
const factory = require('./handlerFactory');

const name = config.db_name;
// const { name } = config.db_local;
// const { db_local: { name } } = config;
// console.log(services);
// const dbName = config.database_name;
// const connection = services.get('connections')[dbName];
const connection = services.get('connections')[name];
const events = eventModel(connection);

module.exports = {

  create: catchAsync(async (req, res, next) => {
    logger.debug('Calling create endpoint with body: %o', req.body, req.user)

    // 1) Create error if user is not educator
    // if (req.user.role !== 'educator') {
    //   return next(new AppError(`Only users with role 'educator' are alowed to create events. Please sign in as an educator.`, 400));
    // }
    logger.debug('User role is', req.user);

    const event = {
      organizers: [req.user.id],
      name: req.body.name,
      summary: req.body.summary,
      description: req.body.description,
      industry: req.body.industry,
      skill: req.body.skill,
      capacity: req.body.capacity,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      time: req.body.time,
      area: req.body.area,
      address: req.body.address,
      photo: '',
      createdBy: req.user.id,
      approved: false,
    };

    const newEvent = await events.create(event);

    if (!newEvent) {
      logger.error(`${err} occured while saving new event ${req.body.name}`);
      res.status(err.status || 400).json({ message: err.message });
    }

    // req.event = event;
    res.status(200).json({
      status: 'success',
      data: {
        event
      }
    });

    // await event.save((err, event) => {

    //   if (err) {
    //     logger.error(`${err} occured while saving new event ${req.body.name}`);
    //     res.status(err.status || 400).json({ message: err.message });
    //   }

    //   req.event = event;
    //   next();

    // });
  }),

  getAllEvents: factory.getAll(events),

  update: catchAsync(async (req, res, next) => {
    logger.debug('Calling update endpoint with body: %o', req.body)

    events.findOne({ _id: req.body._id }, (err, event) => {
      if (err) {
        let message = `${err} occured while searching event ${req.body.name}.`;
        logger.error(message);
        return res.status(400).json({ message: message });
      };

      req.event = event;
    });

    event = {
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
    };

    await event.save((err, event) => {

      if (err) {
        logger.error(`${err} occured while saving new event ${req.body.name}`);
        res.status(err.status || 400).json({ message: err.message });
      }

      req.event = event;
      next();

    });

  })
};