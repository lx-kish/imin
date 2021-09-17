const sharp = require('sharp');

const AppError = require('./appError');
const logger = require('../loaders/logger')();

/**
 * @param req: req object
 * @param sizeL: image length
 * @param sizeH: image height
 * @param format: image format
 * @param quality: image quality
 */
module.exports = {

  resizeToFile: async (req, sizeL, sizeH, format, quality) => {
    // console.log(
    //   '%c resizeImage.resizeToFile, req.file.buffer/sizeL/sizeH/format/quality/fileFullPath ===> ',
    //   'color: yellowgreen; font-weight: bold;',
    //   req.file.buffer,
    //   sizeL,
    //   sizeH,
    //   format,
    //   quality,
    //   req.originalUrl,
    // );

    let fileFullPath = `${process.cwd()}/${Date.now()}.jpeg`; // by default at the root folder, current date, to avoid errors

    // In case of userpic
    if (req.originalUrl === '/api/users/updateMe') {

      req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

      fileFullPath = `${process.cwd()}/client/public/img/userpics/${req.file.filename}`;
    }

    return await sharp(req.file.buffer)
      .resize(sizeL, sizeH)
      .toFormat(format)
      .jpeg({ quality: quality })
      .toFile(fileFullPath)
      .then(logger.debug('User picture has been successfully resized and uploaded to: %o', fileFullPath))
      .catch((e) => new AppError(e))

  },

  resizeToBuffer: async (req, sizeL, sizeH, format, quality) => {
    // console.log(
    //   '%c resizeImage.resizeToBuffer, req.file.buffer/sizeL/sizeH/format/quality/fileFullPath ===> ',
    //   'color: yellowgreen; font-weight: bold;',
    //   req.file.buffer,
    //   sizeL,
    //   sizeH,
    //   format,
    //   quality,
    // );

    return await sharp(req.file.buffer)
      .resize(sizeL, sizeH)
      .toFormat(format)
      .jpeg({ quality: quality })
      .toBuffer()
      .catch((e) => new AppError(e))
  }
}