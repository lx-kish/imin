const mongoose = require('mongoose');

const config = require('../../config');
const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

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
const usersModel = connection.model('user');
const admins = connection.model('admin');
const students = connection.model('student');
const educators = connection.model('educator');

module.exports = {

    getAllUsers: catchAsync(async (req, res, next) => {
        const users = await usersModel.find();

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    }),

    getUser: catchAsync(async (req, res, next) => {

        const user = await usersModel.findById(req.params.id);
        // const user = await user.findOne({ _id: req.params.id });

        if (!user) {
            return next(new AppError(`No user found with id ${req.params.id}`, 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    }),

    updateUser: () => {},
    deleteUser: () => {}

}