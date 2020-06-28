const educatorSchema = require('../schemas/educatorSchema');
const schemaFactory = require('../schemaFactory');
const modelFactory = require('../modelFactory');

const schema = schemaFactory(educatorSchema);

module.exports = (connection) => {
    return modelFactory(connection, 'Educator', schema);
}