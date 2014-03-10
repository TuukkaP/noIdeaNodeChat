var express  = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

app.configure(function() {
    app.use(express.static(__dirname + '/app'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//routes
require('./lib/index')(app);

server.listen(3000, function(){
    console.log("Initialized...");
});
//
//var io = require('socket.io').listen(server);
//
//require('./lib/socket.js')(io);
