const multer = require('multer');
const AppError = require('./appError');

const multerStorage = (dest = '', file = '') => {
    
    if (dest && file) {

        return multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, dest);
                // cb(null, `${process.cwd()}/client/public/img/userpics/`);
            },
            filename: (req, file, cb) => {
                // <prefix('user')>-<ObjectId('from-mongoDB')>-<timestamp(17012324656987)>.<file-extention>
                const ext = file.mimetype.split('/')[1];
                cb(null, file);
                // cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
            }
        });
    }

    return multer.memoryStorage();
};

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images', 404));
    }
};

// const upload = multer({ dest: `${process.cwd()}/client/public/img/userpics/` });

module.exports = (fieldname, dest = '', file = '') => {
    
    const upload = multer({
        storage: multerStorage(dest, file),
        fileFilter: multerFilter
    });

    upload.single(fieldname);
};