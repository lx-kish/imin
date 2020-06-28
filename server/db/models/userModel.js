const userSchema = require('../schemas/userSchema');
const schemaMiddleware = require('../middleware/userMongoMiddleware');
const schemaFactory = require('../schemaFactory');
const modelFactory = require('../modelFactory');

const pureSchema = schemaFactory(userSchema);

const schemaWithMiddleware = schemaMiddleware(pureSchema);

module.exports = (connection) => {
    return modelFactory(connection, 'users', schemaWithMiddleware);
}