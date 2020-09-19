const logger = require('../../loaders/logger')();
const AppError = require('../../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el = el.message);

    const message = `invalid input data. ${errors.join(', ')}`;
    return new AppError(message, 400);
}

const handleJWTError = err => {
    const message = `Invalid token. Please log in again`;
    return new AppError(message, 401)
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        // Operational, trusted errors, can be sent to client
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        // Weird programming and third party software errors, do not send to client
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    logger.error('🔥 error %o', err);

    // res.status(err.statusCode).json({
    //     status: err.status,
    //     message: err.message
    // });

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError(error);

        sendErrorProd(error, res);
    }

};