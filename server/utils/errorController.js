const logger = require('../loaders/logger')();

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    logger.error('🔥 error %o', err);

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};