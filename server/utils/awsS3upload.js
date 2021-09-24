const aws = require('aws-sdk')
const AppError = require('./appError');
const config = require('../config');

/**
 * @param fileName: filename to be saved
 * @param file: bufferd data
 */

module.exports = async (file, fileName) => {
  // console.log(
  //   '%c awsS3upload, fileName/file ===> ',
  //   'color: yellowgreen; font-weight: bold;',
  //   // file,
  //   fileName,
  // );

  const s3 = new aws.S3({
    accessKeyId: config.awsS3.accessKeyId,
    secretAccessKey: config.awsS3.accessKey,
    region: config.awsS3.region,
  });

  const bucketName = config.awsS3.bucketName;

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file,
    ACL: 'private',
  };

  return await s3.putObject(params).promise();
}