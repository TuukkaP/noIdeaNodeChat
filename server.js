var express  = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//routes
require('./lib/index')(app);

server.listen(process.env.PORT || 3000){
    console.log("Initialized...");
});

var io = require('socket.io').listen(server);
require('./lib/socket')(io);
