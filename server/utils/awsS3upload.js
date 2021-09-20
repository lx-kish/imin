const aws = require('aws-sdk')
const AppError = require('./appError');

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
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
  });

  const bucketName = process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME;

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file,
    ACL: 'private',
  };

  return await s3.putObject(params).promise();
}