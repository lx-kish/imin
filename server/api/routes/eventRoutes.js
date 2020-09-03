const { Router } = require('express');
const logger = require('../../loaders/logger')();

const eventMiddleware = require('../controllers/eventController');

const route = Router();

module.exports = async (app) => {
    
    app.use('/events', route);

    route.post('/', eventMiddleware.create);

    route.patch('/:id', eventMiddleware.update);

    return app;
};