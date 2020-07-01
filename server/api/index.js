const { Router } = require('express');
const fs = require('fs');
// const files = require('./middleware/getFilesSync');
const logger = require('../loaders/logger')();

module.exports = () => {

    const app = Router();

    const path = __dirname + '\\routes';
    
    logger.info(`Loading routes from: ${path}`);

    fs.readdirSync(path).forEach((file) => {
        const route = `${path}\\${file.substr(0, file.indexOf('.'))}`;
        logger.info(`Adding route: ${route}`);
        require(route)(app);
    });

    return app;
}