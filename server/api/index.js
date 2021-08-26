const path = require('path');

const { Router } = require('express');
const fs = require('fs');
// const files = require('./middleware/getFilesSync');
const logger = require('../loaders/logger')();

module.exports = () => {

    const app = Router();

    const routesFolder = path.join(__dirname, '/routes');
    // console.log(`path.join(__dirname, '/routes') ====> `, path.join(__dirname, '/routes'));
    // console.log(`__dirname ====> `, __dirname);
    // const routesFolder = __dirname + '\\routes';

    logger.info(`Loading routes from: ${routesFolder}`);

    try {
        fs.readdirSync(routesFolder).forEach((file) => {
            // const route = `${routesFolder}/${file.substr(0, file.indexOf('.'))}`;
            const route = `${routesFolder}\\${file.substr(0, file.indexOf('.'))}`;
            logger.info(`Adding route: ${route}`);
            // console.log(`require(${route}) ====> `, require(route)(app));
            require(route)(app);
        });
    } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
    }

    return app;
}