const router = require('express').Router();

const authController = require('../controllers/authController');
const eventController = require('../controllers/eventController');

// const route = Router();

module.exports = async (app) => {
    
    app.use('/events', router);

    router.use(authController.isAuth);

    router.post('/create', eventController.create);

    router.patch('/:id', eventController.update);

    return app;
};