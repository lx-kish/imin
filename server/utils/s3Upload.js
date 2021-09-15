const aws = require('aws-sdk')
const AppError = require('./appError');

/**
 * @param fileName: filename to be saved
 * @param file: bufferd data
 */

const defaultContentType = (req, file, cb) => {
  setImmediate(() => {
    const contentType = file.contentType || file.mimetype || 'application/octet-stream';
    cb(null, contentType);
  });
}

module.exports = (fileName, file) => {
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

  aws.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
    contentType: defaultContentType,
    limits: { fileSize: 1000000, files: process.env.AWS_S3_MAX_FILE_COUNT || 6 }
  })

  var s3bucket = new aws.S3({ params: { Bucket: process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME } });

  var params = { Key: fileName, Body: file };
  // TODO setting proper header for s3
  s3bucket.upload(params, function (err, data) {
    if (err) {
      console.log('Error uploading data: ', err);
    } else {
      console.log('Successfully uploaded data to myBucket/myKey');
    }
  });

  try {
    return await sharp(req.file.buffer)
      .resize(sizeL, sizeH)
      .toFormat(format)
      .jpeg({ quality: quality })
      .toBuffer();
  } catch (e) {
    return new AppError(e);
  }


}