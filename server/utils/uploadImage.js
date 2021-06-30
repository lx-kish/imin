const multer = require('multer');
const AppError = require('./appError');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.cwd()}/client/public/img/userpics/`);
    },
    filename: (req, file, cb) => {
        // <prefix('user')>-<ObjectId('from-mongoDB')>-<timestamp(17012324656987)>.<file-extention>
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
    }
});
// const multerStorage = multer.memoryStorage();

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

module.exports = (fieldname) => upload.single(fieldname);