const userSchema = require('../schemas/userSchema');
const userDiscriminator = require('../schemas/userDiscriminator');
const participantSchema = require('../schemas/participantSchema');
const educatorSchema = require('../schemas/educatorSchema');
const studentSchema = require('../schemas/studentSchema');
const adminSchema = require('../schemas/adminSchema');
const schemaMiddleware = require('../middleware/userMongoMiddleware');
const schemaFactory = require('../schemaFactory');
const modelFactory = require('../modelFactory');
const mongoose = require('mongoose');

const userBase = schemaFactory(userSchema, userDiscriminator);

const schemaWithMiddleware = schemaMiddleware(userBase);

// console.log('----------->', schemaWithMiddleware)

const participantBase = schemaFactory(participantSchema, userDiscriminator);

// console.log('----------->', participantBase)

const educator = schemaFactory(educatorSchema);
const student = {};
const admin = {};

// const baseOptions = {
//     discriminatorKey: 'role', // our discriminator key, could be anything
//     collection: 'users', // the name of our collection
// };

// const userSchema = new mongoose.Schema({
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     access_token: { type: String }
// }, baseOptions, );

// Our Base schema: these properties will be shared with our "real" schemas
// const userBase = mongoose.model('users', , );

// const schemaWithMiddleware = schemaMiddleware(userBase);

module.exports = (connection) => {
    try {
        console.log('--------------->', Object.keys(connection.model('users')))
        const userBaseModel = modelFactory(connection, 'users1', schemaWithMiddleware);
        console.log('===========>', userBaseModel)
        const participantModel = userBaseModel.discriminator('participants', participantBase);
        

        // const adminModel = userBaseModel.discriminator('admin', {}, 'admin');
        // const studentModel = participantModel.discriminator('student', {}, 'student')
        // const educatorModel = participantModel.discriminator('educator', educator, 'educator');

        return { user: userBaseModel, participant: participantModel }; //, admin: adminModel, student: studentModel, educator: educatorModel };
        // return modelFactory(connection, 'users', schemaWithMiddleware);

    }
    catch (e) {
        console.log(e)
    }
}