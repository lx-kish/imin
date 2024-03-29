const mongoose = require('mongoose');

const config = require('../../config');
const logger = require('../../loaders/logger')();
const services = require('../../loaders/services');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const filterObj = require('../../utils/filterObject');
const factory = require('./handlerFactory');

// Images processing and uploading utilites
const uploadImage = require('../../utils/uploadImage');
const resizeImage = require('../../utils/resizeImage');
const awsS3upload = require('../../utils/awsS3upload');

const name = require('../../config').db_name;
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
// const admins = connection.model('admin');
// const students = connection.model('student');
// const educators = connection.model('educator');

module.exports = {

    // @TODO - sort out issue with multer 'limits/fileSize' property
    processUserPic: uploadImage.memoryLoader(3 * 1024 * 1024).single('userpic'),

    uploadUserPicLocallyFullSize: uploadImage.diskLoader(3 * 1024 * 1024).single('userpic'),

    uploadUserPicLocallyResize: catchAsync(async (req, res, next) => {

        // console.log(
        //     '%c userController.resizeUserPicLocally, req.file ===> ',
        //     'color: yellowgreen; font-weight: bold;',
        //     req.file,
        // );

        if (!req.file) return next();

        await resizeImage.resizeToFile(req, 500, 500, 'jpeg', 90);

        next();

    }),

    uploadUserPicS3FullSize: catchAsync(async (req, res, next) => {

        if (!req.file) return next();

        req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

        const fileFullPath = `${process.cwd()}/client/public/img/userpics/${req.file.filename}`;

        await resizeImage.resizeToFile(req, 500, 500, 'jpeg', 90, fileFullPath);

        logger.debug('User picture was successfully updated and uploaded to: %o', fileFullPath);
        next();
    }),

    uploadUserPicS3Resize: catchAsync(async (req, res, next) => {

        if (!req.file) return next();

        req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

        await resizeImage.resizeToBuffer(req, 500, 500, 'jpeg', 90)
        .then(resizedFile => awsS3upload(resizedFile, `img/userpics/${req.file.filename}`))
        .then((data) => { 
            logger.debug(`User picture ${req.file.filename} was successfully uploaded to AWS S3 Bucket %o`);
            next();
        })
        .catch(e => next(new AppError(e)));

    }),

    getMe: catchAsync(async (req, res, next) => {
        // console.log(
        //     '%c users/auth route, userController.getMe routine, req.user/res.locals.user/res.locals ===> ',
        //     'color: yellowgreen; font-weight: bold;',
        //     req.user,
        // );
        req.params.id = req.user.id;
        next();
    }),

    updateMe: catchAsync(async (req, res, next) => {
        console.log(
            '%c userController.updateMe, req.body, req.file, req.user ===> ',
            'color: yellowgreen; font-weight: bold;',
            req.body,
            req.file,
            req.user,
        );

        // 1) Create error if user POSTs password or email
        if (req.body.password || req.body.passwordConfirm) {
            return next(new AppError('This route is for updating personal settings only. Please use security page', 400));
        }

        // 2) Filtered out unwanted fields that are not allowed to be updated
        const filteredBody = filterObj(
            req.body,
            'name',
            'surname',
            'phone',
            'location',
            'profession',
            'industries',
            'skills',
            'company',
            'website',
        );

        if (req.file) filteredBody.photo = req.file.filename;

        // console.log(
        //     '%c userController.updateMe, filteredBody, req.user.role ===> ',
        //     'color: yellowgreen; font-weight: bold;',
        //     filteredBody,
        //     req.user.role,
        // );

        // 3) Update user document
        const updatedUser = await connection.model(req.user.role).findByIdAndUpdate(
            req.user._id,
            filteredBody,
            {
                new: true,
                runValidators: true
            }
        );

        logger.debug('User profile data was successfully updated: %o', updatedUser);

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    }),

    getAllUsers: factory.getAll(users),

    getUser: factory.getOne(users),

    updateUser: factory.updateOne(users),

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