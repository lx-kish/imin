
let services = require('./loaders/services');
let mongoose = require('./loaders/mongoose');

// services.reset();

function log() {
    console.log(services.getServices());
}

setTimeout(log(), 20000);
// console.log(mongoose.services);