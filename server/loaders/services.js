const Logger = require('../loaders/logger')();

/**
 * Service pool: object, containing instances of services,
 * using through the app
 * @param {*} services - object structure, containing instances
 */
let services;

const init = () => {
    services = {};
}

init();

module.exports = {

    /**
     * Sets a specific service for a specific key
     * @param {String} key - the name of the specific service
     * @param {Object} service - storing instance
     */
    set: (key, service) => {
        Logger.info('Validation services...');
        if (!services) init();
        Logger.info(`Services initiated. Injecting service ${key}...`);
        services[key] = service;
        Logger.info(`✌️ Service ${key} has been injected successfully.`)
    },

    /**
     * Gets a specific service by a specific key
     * @param {String} key - the name of the specific service
     */
    get: (key) => {
        return services[key];
    },

    /**
     * Resets the service pool to an empty object
     */
    reset: () => {
        Logger.info('All services have been reset!');
        init();
    },

    /**
     * Gets the services whole object
     */
    getServices: () => {
        
        if (!services) init();
        return services;
    }
}