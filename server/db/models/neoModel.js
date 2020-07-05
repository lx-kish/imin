module.exports = (connection) => {
    try {
        //SCHEMAS
        const userSchema = require('../schemas/userSchema');
        const userDiscriminator = require('../schemas/userDiscriminator');
        const adminSchema = require('../schemas/adminSchema');
        const educatorSchema = require('../schemas/educatorSchema');
        const studentSchema = require('../schemas/studentSchema');

        //FACTORIES
        const schemaMiddleware = require('../middleware/userMongoMiddleware');
        const schemaFactory = require('../schemaFactory');
        const modelFactory = require('../modelFactory');

        //CREATING SCHEMA-OBJECTS
        const userBase = schemaFactory(userSchema, userDiscriminator);
        //ADDING MIDDLEWARE
        const schemaWithMiddleware = schemaMiddleware(userBase);

        const adminBase = schemaFactory(adminSchema);

        const educatorBase = schemaFactory(educatorSchema);
        const studentBase = schemaFactory(studentSchema);

        const userBaseModel = modelFactory(connection, 'users', schemaWithMiddleware);

        const adminModel = userBaseModel.discriminator('admins', adminBase);
        const educatorModel = userBaseModel.discriminator('educators', educatorBase);
        const studentModel = userBaseModel.discriminator('students', studentBase);;

        return { 
            users: userBaseModel,
            admins: adminModel,
            educators: educatorModel,
            students: studentModel
        };
    }
    catch (e) {
        throw new Error(e);
    }
}