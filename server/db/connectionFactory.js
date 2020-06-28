/**
Dependency Injection for Mongoose connections
Multiple connections to multiple URLs supported

@returns {mongoose.connection} object

@param dbURL - source where mongoDB server located,
for example: 
const dbURL = 'mongodb://localhost:27017/dbName'

@TODO - write configurations tool for connection
parameters currently hardcoded
*/
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

module.exports = (dbURL) => {
	try {
		return mongoose.createConnection(dbURL);
	} catch (e) {
		return e;
	}
};