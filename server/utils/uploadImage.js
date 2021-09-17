const multer = require('multer');
const AppError = require('./appError');

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 404));
  }
};

// based on https://stackoverflow.com/questions/62672111/how-do-you-use-express-fileupload-correctly
module.exports = {

  memoryLoader: (fileSizeLimit) => multer({
    storage: multer.memoryStorage(),
    fileFilter: multerFilter,
    limits: {
      fileSize: fileSizeLimit,
      // fileSize: 2097152, // 2 MByte
    },
  }),

  diskLoader: (fileSizeLimit) => multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        // console.log(
        //   '%c uploadingImages.diskLoader, req.body.event ===> ',
        //   'color: yellowgreen; font-weight: bold;',
        //   req.body,
        //   file.fieldname,
        // );

        let destination = `${process.cwd()}/`; // by default at the root folder, to avoid errors

        // in case of userpic
        if (file.fieldname === 'userpic')
          destination = `${process.cwd()}/client/public/img/userpics/`;

        cb(null, destination);
      },
      filename: (req, file, cb) => {
        // console.log(
        //   '%c uploadingImages.diskLoader, req.body.event ===> ',
        //   'color: yellowgreen; font-weight: bold;',
        //   req.body,
        //   file,
        // );

        let filename = `${Date.now()}.jpeg`; // by default current date, to avoid errors

        // in case of userpic
        if (file.fieldname === 'userpic')
          filename = `user-${req.user.id}-${Date.now()}.jpeg`;

        cb(null, filename)
      }
    }),
    fileFilter: multerFilter,
    limits: {
      fileSize: fileSizeLimit,
      // fileSize: 67108864, // 64 MByte
    },
  })
}