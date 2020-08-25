/**
 * Dependency Injection for Mongoose schema
 * 
 * @returns {mongoose.Schema}
 * 
 * @param {schemaObject} - object defining property for mongoDB documents,
 * for example:
 * const schemaObject = {
 *     name: String,
 *     value: Number,
 *     date: {
 *         type: Date,
 *         default: Date.now
 *     }
 * }
 */
const mongoose = require('mongoose');

module.exports = (schemaObject, options = null) => {
    try {
        return options ? 
        new mongoose.Schema(schemaObject, options)
        : new mongoose.Schema(schemaObject);
    } catch (e) {
        return e;
    }
}