const router = require('express').Router();

const authController = require('../controllers/authController');
const eventController = require('../controllers/eventController');

// const route = Router();

module.exports = async (app) => {

    app.use('/events', router);

    router.use(authController.isAuth);

    router
        .route('/')
        .get(
            authController.isPermitted('admin'),
            eventController.getAllEvents)
        .post(
            authController.isPermitted('educator'),
            eventController.create
        );

    router.patch(
        '/:id',
        authController.isPermitted('educator'),
        eventController.update
    );

    router
        .route('/area/:areaID/from/:startDate')
        .get(eventController.getEventsWithinAreaFromDate); // for dashboard

    router
        .route('/from/:startDate/to/:endDate')
        .get(eventController.getAllEventsForThePeriod); //events for the period for admins

    router
        .route('/area/:areaID/from/:startDate/to/:endDate')
        .get(eventController.getEventsWithinAreaForThePeriod); //events for the period for admins

    return app;
};