const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');
const eventModel = require('../../db/models/eventModel');
const catchAsync = require('../../utils/catchAsync');
const filterObj = require('../../utils/filterObject');
const factory = require('./handlerFactory');

// Images processing and uploading utilites
const uploadImage = require('../../utils/uploadImage');
const resizeImage = require('../../utils/resizeImage');
const awsS3upload = require('../../utils/awsS3upload');

const name = require('../../config').db_name;
const connection = services.get('connections')[name];
const events = eventModel(connection);

module.exports = {

  // @TODO - sort out issue with multer 'limits/fileSize' property
  processEventImg: uploadImage.memoryLoader(3 * 1024 * 1024).single('eventimage'),

  uploadEventImgLocallyFullSize: uploadImage.diskLoader(3 * 1024 * 1024).single('userpic'),

  uploadEventImgLocallyResize: catchAsync(async (req, res, next) => {

    // console.log(
    //     '%c userController.resizeUserPicLocally, req.file ===> ',
    //     'color: yellowgreen; font-weight: bold;',
    //     req.file,
    // );

    if (!req.file) return next();

    await resizeImage.resizeToFile(req, 500, 500, 'jpeg', 90);

    next();

  }),

  uploadEventImgS3FullSize: catchAsync(async (req, res, next) => {

    if (!req.file) return next();

    req.file.filename = `event-${req.user.id}-${Date.now()}.jpeg`;

    const fileFullPath = `${process.cwd()}/client/public/img/userpics/${req.file.filename}`;

    await resizeImage.resizeToFile(req, 500, 500, 'jpeg', 90, fileFullPath);

    logger.debug('Event picture was successfully updated and uploaded to: %o', fileFullPath);
    next();
  }),

  uploadEventImgS3Resize: catchAsync(async (req, res, next) => {

    if (!req.file) return next();

    req.file.filename = `event-${req.user.id}-${Date.now()}.jpeg`;

    await resizeImage.resizeToBuffer(req, 500, 500, 'jpeg', 90)
      .then(resizedFile => awsS3upload(resizedFile, `img/userpics/${req.file.filename}`))
      .then((data) => {
        logger.debug(`Event picture ${req.file.filename} was successfully uploaded to AWS S3 Bucket %o`);
        next();
      })
      .catch(e => next(new AppError(e)));

  }),

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
  }),


  update: catchAsync(async (req, res, next) => {

    // 1) Create error if user tries to update password
    if (req.body.createdBy || req.body.creationDate) {
      return next(new AppError('Event creator and/or event creation date can not be updated!', 400));
    }

    logger.debug('Calling update endpoint with body: %o', req.body);

    // 2) Filtered out unwanted fields that are not allowed to be updated
    const filteredBody = filterObj(
      req.body,
      'organizers',
      'name',
      'summary',
      'description',
      'industry',
      'skill',
      'capacity',
      'startDate',
      'endDate',
      'time',
      'address',
    );

    if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    const updatedEvent = await events.findByIdAndUpdate(
      req.param.id,
      filteredBody,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });

  }),

  getEventsWithinAreaFromDate: catchAsync(async (req, res, next) => {

  }),

  getAllEventsForThePeriod: catchAsync(async (req, res, next) => {

    const periodStart = `${req.params.startDate}T12:00:00.000+00:00`;
    const periodEnd = `${req.params.endDate}T12:23:59.999+00:00`;

    // console.log(
    //   '%c eventController.getAllEventsForThePeriod routine, req.params.startDate/req.params.endDate ===> ',
    //   'color: yellowgreen; font-weight: bold;',
    //   req.params.startDate,
    //   req.params.endDate,
    // );

    const selectedEvents = await events.find(
      { "startDate": { $gte: new Date(periodStart), $lte: new Date(periodEnd) } }
    );

    res.status(200).json({
      status: 'success',
      data: {
        selectedEvents
      }
    });
  }),

  getEventsWithinAreaForThePeriod: catchAsync(async (req, res, next) => {

  }),

  getAllEvents: factory.getAll(events),
};