// const path = require('path');
const sharp = require('sharp');
const AppError = require('./appError');

module.exports = {

  resizeToFile: async (req, sizeL, sizeH, format, quality, fileFullPath) => {
    console.log(
      '%c users/auth route, userController.resizeUserPic routine, req.file.buffer/sizeL/sizeH/format/quality/fileFullPath ===> ',
      'color: yellowgreen; font-weight: bold;',
      req.file.buffer,
      sizeL,
      sizeH,
      format,
      quality,
      fileFullPath,
    );

    return await sharp(req.file.buffer)
      .resize(sizeL, sizeH)
      .toFormat(format)
      .jpeg({ quality: quality })
      .toFile(fileFullPath)
      .catch((e) => new AppError(e))

  },

  resizeToBuffer: async (req, sizeL, sizeH, format, quality) => {
    // console.log(
    //   '%c users/auth route, userController.resizeUserPic routine, req.file.buffer/sizeL/sizeH/format/quality/fileFullPath ===> ',
    //   'color: yellowgreen; font-weight: bold;',
    //   req.file.buffer,
    //   sizeL,
    //   sizeH,
    //   format,
    //   quality,
    //   fileFullPath,
    // );

    return await sharp(req.file.buffer)
      .resize(sizeL, sizeH)
      .toFormat(format)
      .jpeg({ quality: quality })
      .toBuffer()
      .catch((e) => new AppError(e))
  }
}