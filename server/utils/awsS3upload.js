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

aws.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
  // contentType: defaultContentType,
  // limits: { fileSize: 1000000 }
  // limits: { fileSize: 1000000, files: process.env.AWS_S3_MAX_FILE_COUNT || 6 }
})

module.exports = (file, fileName) => {
  console.log(
    '%c awsS3upload, fileName/file ===> ',
    'color: yellowgreen; font-weight: bold;',
    file,
    fileName,
    process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME,
    process.env.AWS_S3_ACCESS_KEY_ID,
    process.env.AWS_S3_ACCESS_KEY,
    process.env.AWS_S3_REGION,
  );

  return new Promise((resolve, reject) => {

    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
      region: process.env.AWS_S3_REGION,
    });

    const bucketName = process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME;

    // let bucketPath = filePath;

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: image,
    };

    s3.putObject(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        resolve();
      }
    });
  });

  // // const fullPathToFile = `img/userpics/`;

  // const params = {
  //   Bucket: process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME,
  //   Key: fileName,
  //   Body: file,
  //   // ACL: 'img/userpics',
  // };

  // const s3bucket = new aws.S3();
  // // const s3bucket = new aws.S3({ params: { Bucket: process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME } });
  // // const params = { Key: fileName, Body: file };

  // // TODO setting proper header for s3
  // // s3bucket.upload(params);
  // s3bucket.putObject(params, (err, data) => {
  //   if (err) {
  //     new AppError(err);
  //   } else {
  //     resolve();
  //     // console.log('Successfully uploaded data to myBucket/myKey');
  //   }
  // });

}