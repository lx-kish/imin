const path = require('path');
const multer = require('multer');
const AppError = require('./appError');

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
      cb(null, true);
  } else {
      cb(new AppError('Not an image! Please upload only images', 404));
  }
};

module.exports = {

  memoryLoader: multer({
    storage: multer.memoryStorage(),
    fileFilter: multerFilter,
    limits: {
      fileSize: 2097152, // 2 MByte
    },
  }),

  diskLoader: multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, path.join(__dirname, '../tmp/upload'));
      },
    }),
    fileFilter: multerFilter,
    limits: {
      fileSize: 67108864, // 64 MByte
    },
  })
}