module.exports = (connection) => {
    try {
        //SCHEMAS
        const areaSchemaObject = require('../schemas/areaSchema');

        //FACTORIES
        // const schemaMiddleware = require('../middleware/userMongoMiddleware');
        const schemaFactory = require('../schemaFactory');
        const modelFactory = require('../modelFactory');

        //CREATING SCHEMA-OBJECTS
        const areaSchema = schemaFactory(areaSchemaObject);

        //CREATING MODELS FOR FURTHER USE
        const areaModel = modelFactory(connection, 'Area', areaSchema);

        return areaModel;
    }
    catch (e) {
        throw new Error(e);
    }
}