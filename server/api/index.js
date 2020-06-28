const { Router } = require('express');
const fs = require('fs');
// const files = require('./middleware/getFilesSync');
const Logger = require('../loaders/logger')();

module.exports = () => {

    const app = Router();

    const path = __dirname + '\\routes';
    
    Logger.info(`Loading routes from: ${path}`);

    fs.readdirSync(path).forEach((file) => {
        const route = `${path}\\${file.substr(0, file.indexOf('.'))}`;
        Logger.info(`Adding route: ${route}`);
        require(route)(app);
    });

    return app;
}