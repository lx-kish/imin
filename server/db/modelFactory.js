/**
Dependency Injection for Mongoose model
Multiple models to multiple connections supported

@returns {mongoose.connection.model} object

@param connection - mongoose.createConnection(dbURL) object

@param modelName - String, 'Document', the singular name 
of the collection the model is for 

@param schema - mongoose.Schema() object

*/
module.exports = (connection, modelName, schema, options = null) => {

    try {
        return options ? 
        connection.model(modelName, schema, options) 
        : connection.model(modelName, schema);
    } catch (e) {
        return e;
    }
};