module.exports = (connection) => {
    try {
        //SCHEMAS
        /**
         * Initiate loaders for all schemas (base: "user", and for each role:
         * "admin", "educator", and "student", based on "user" schema,
         * and using "role" discriminator), and the discriminator for roles.
         */
        const userSchema = require('../schemas/userSchema');
        const userDiscriminator = require('../schemas/userDiscriminator');
        const adminSchema = require('../schemas/adminSchema');
        const educatorSchema = require('../schemas/educatorSchema');
        const studentSchema = require('../schemas/studentSchema');

        //FACTORIES
        /**
         * Initiate loaders for all factories: schema factory, model factory,
         * schema middleware for "user" schema
         */
        const schemaMiddleware = require('../middleware/userMongoMiddleware');
        const schemaFactory = require('../schemaFactory');
        const modelFactory = require('../modelFactory');

        //CREATING SCHEMA-OBJECTS
        /**
         * Initiate base "user" schema and apply "role" discriminator
         */
        const userBase = schemaFactory(userSchema, userDiscriminator);

        //ADDING MIDDLEWARE
        /**
         * Apply middleware for "user" schema
         */
        const schemaWithMiddleware = schemaMiddleware(userBase);

        /**
         * Initiate "admin", "educator" and "student" schemas
         */
        const adminBase = schemaFactory(adminSchema);
        const educatorBase = schemaFactory(educatorSchema);
        const studentBase = schemaFactory(studentSchema);

        //CREATING MODELS FOR FURTHER USE
        /**
         * Initiate model for base "user" schema
         */
        const userBaseModel = modelFactory(connection, 'User', schemaWithMiddleware);

        /**
         * Initiate "admin", "educator" and "student" schemas using 
         * "role" discriminator
         */
        const adminModel = userBaseModel.discriminator('Admin', adminBase);
        const educatorModel = userBaseModel.discriminator('Educator', educatorBase);
        const studentModel = userBaseModel.discriminator('Student', studentBase);;

        /**
         * Return all models: base "users" model for authentication purposes,
         * and "admins", "educators" and "students" models for each role
         */
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