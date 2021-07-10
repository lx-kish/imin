const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');

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

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, `${process.cwd()}/client/public/img/userpics/`);
//     },
//     filename: (req, file, cb) => {
//         // <prefix('user')>-<ObjectId('from-mongoDB')>-<timestamp(17012324656987)>.<file-extention>
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
//     }
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images', 404));
    }
};

// const upload = multer({ dest: `${process.cwd()}/client/public/img/userpics/` });
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });

    return newObj;
};

module.exports = {

    uploadUserPic: upload.single('userpic'),

    // uploadImage: catchAsync(async (req, res, next) => {
    //     // 1) if no file found, then go next;
    //     // if (!req.file) return next();

    //     // 2) set dest folder and filename for uploading raw userpic
    //     const dest = `${process.cwd()}/client/public/img/userpics/`;
    //     // const ext = req.file.mimetype.split('/')[1];
    //     const file = `user-${req.user.id}-${Date.now()}`;

    //     // 3) uploading to the 
    //     // uploadImage('userpic');
    //     uploadImage('userpic', dest, file);

    // }),

    resizeUserPic: catchAsync(async (req, res, next) => {
        if (!req.file) return next();

        req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

        const fileFullPath = `${process.cwd()}/client/public/img/userpics/${req.file.filename}`;
    
        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            // .toFile(`${process.cwd()}\\client\\public\\img\\userpics\\`);
            .toFile(fileFullPath);
    
        logger.debug('User picture was successfully updated and uploaded to: %o', fileFullPath);
        next();
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

        console.log(
            '%c userController.updateMe, filteredBody, req.user.role ===> ',
            'color: yellowgreen; font-weight: bold;',
            filteredBody,
            req.user.role,
        );

        // 3) Update user document
        const updatedUser = await connection.model(req.user.role).findByIdAndUpdate(
        // const updatedUser = await users.findByIdAndUpdate(
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