const fs = require('fs');
const path = require('path');

// const pathToFile = './routes';
// const pathToFile = path.resolve(__dirname, '../routes');

const file = require('./middleware/getFilesSync');

console.log(file(path.resolve(__dirname, './routes')));

// console.log(require('./middleware/getFilesSync')(pathToFile));

// console.log(path.relative(__dirname, '../routes'));