var express = require('express');

var serverPort = 3000;
var app = express();
var server = app.listen(serverPort);


// HTTP Keep-Alive to a short time to allow graceful shutdown
server.on('connection', function (socket) {
    socket.setTimeout(5 * 1000);
});

// Handle ^C
process.on('SIGINT', shutdown).on('SIGTERM', shutdown);

if (process.platform === 'win32') {
    
    console.log('System defined as win32');

    var rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const emit = () => {
        process.emit('SIGINT');
    };

    rl.on('SIGINT', emit).on('SIGTERM', emit);

    
}

// Do graceful shutdown
function shutdown() {
    console.log('graceful shutdown express');
    server.close(function () {
        console.log('closed express');
    });
}

console.log('running server: http://localhost:' + serverPort);