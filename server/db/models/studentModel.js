const studentSchema = require('../schemas/studentSchema');
const schemaMiddleware = require('../middleware/userMongoMiddleware');
const schemaFactory = require('../schemaFactory');
const modelFactory = require('../modelFactory');

const pureSchema = schemaFactory(studentSchema);

const schemaWithMiddleware = schemaMiddleware(pureSchema);

module.exports = (connection) => {
    return modelFactory(connection, 'Students', schemaWithMiddleware);
}