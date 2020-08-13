module.exports = (connection) => {
    try {
        //SCHEMAS
        const eventSchemaObject = require('../schemas/eventSchema');

        //FACTORIES
        // const schemaMiddleware = require('../middleware/userMongoMiddleware');
        const schemaFactory = require('../schemaFactory');
        const modelFactory = require('../modelFactory');

        //CREATING SCHEMA-OBJECTS
        const eventSchema = schemaFactory(eventSchemaObject);

        //ADDING MIDDLEWARE
        // const schemaWithMiddleware = schemaMiddleware(eventBase);

        //CREATING MODELS FOR FURTHER USE
        const eventModel = modelFactory(connection, 'events', eventSchema);

        return eventModel;
    }
    catch (e) {
        throw new Error(e);
    }
}