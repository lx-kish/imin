const mongoose = require('mongoose');

const config = require('../../config');
const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const factory = require('./handlerFactory');

const uploadImage = require('../../utils/uploadImage');

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

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });

    return newObj;
};

module.exports = {

    getMe: catchAsync(async (req, res, next) => {
        // getMe: (req, res, next) => {
        // console.log(
        //     '%c users/auth route, userController.getMe routine, req.user/res.locals.user/res.locals ===> ',
        //     'color: yellowgreen; font-weight: bold;',
        //     req.user,
        //     // res.locals.user,
        //     // res.locals
        // );
        req.params.id = req.user.id;
        next();
    }),

    updateMe: catchAsync(async (req, res, next) => {
        console.log(
            '%c userController.updateMe, req.file, req.body ===> ',
            'color: yellowgreen; font-weight: bold;',
            // req.file,
            // req.body,
            req.user,
            req.values,
        );

        // 1) Create error if user POSTs password
        if (req.body.password || req.body.passwordConfirm) {
            return next(new AppError('This route is not for password updates. Please use updateMyPassword', 400));
        }

        // 2) Filtered out unwanted fields that are not allowed to be updated
        const filteredBody = filterObj(req.body, 'name', 'email');
        if (req.file) filteredBody.photo = req.file.filename;

        // 3) Update user document
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
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
        // console.log(req.user);
        // factory.updateOne(users);
        // // factory.updateOne(connection.model(req.user.role));
    }),

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

    uploadImage: catchAsync(async (req, res, next) => {
        // 1) if no file found, then go next;
        if (!req.file) return next();

        // 2) set dest folder and filename for uploading raw userpic
        const dest = `${process.cwd()}/client/public/img/userpics/`;
        const ext = req.file.mimetype.split('/')[1];
        const file = `user-${req.user.id}-${Date.now()}.${ext}`;

        // 3) uploading to the 
        uploadImage('userpic');

    }),

    updateUser: factory.updateOne(users),
    // updateUser: (req, res, next) => { 

    //     console.log(req.user);
    //     factory.updateOne(users);
    //     // factory.updateOne(connection.model(req.user.role));
    // },

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