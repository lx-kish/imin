const mongoose = require('mongoose');

const config = require('../../config');
const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const factory = require('./handlerFactory');

const { db: { name } } = require('../../config');

const connection = services.get('connections')[name];

/**
 * Important! If you opened a separate connection using 
 * mongoose.createConnection() but attempt to access 
 * the model through mongoose.model('ModelName') 
 * it will not work as expected since it is not hooked up 
 * to an active db connection. 
 * In this case access your model through the connection you created.
 * https://github.com/Automattic/mongoose/blob/master/README.md
 */
const users = connection.model('user');
const admins = connection.model('admin');
const students = connection.model('student');
const educators = connection.model('educator');

module.exports = {

    getMe: (req, res, next) => {
        req.params.id = req.user.id;
        next();
    },

    getAllUsers: factory.getAll(users),

    getUser: factory.getOne(users),


    // getAllUsers: catchAsync(async (req, res, next) => {
    //     // const users = await users.find();

    //     res.status(200).json({
    //         status: 'success',
    //         results: users.length,
    //         data: {
    //             users
    //         }
    //     });
    // }),

    // getUser: catchAsync(async (req, res, next) => {

    //     const user = await users.findById(req.params.id);
    //     // const user = await user.findOne({ _id: req.params.id });

    //     if (!user) {
    //         return next(new AppError(`No user found with id ${req.params.id}`, 404));
    //     }

    //     res.status(200).json({
    //         status: 'success',
    //         data: {
    //             user
    //         }
    //     })
    // }),

    updateUser: factory.updateOne(users),
    // updateUser: (req, res, next) => { 

    //     console.log(req.user);
    //     factory.updateOne(users);
    //     // factory.updateOne(connection.model(req.user.role));
    // },
    // updateUser: () => { },
    deleteUser: () => { },

    getRole: (req, res, next) => {
        factory.getOne(connection.model(req.params.role))(req, res, next);
    },

    updateRole: (req, res, next) => {
        factory.updateOne(connection.model(req.params.role))(req, res, next);
    },

    deleteRole: (req, res, next) => {
        factory.deleteOne(connection.model(req.params.role))(req, res, next);
    }
}