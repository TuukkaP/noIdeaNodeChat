var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

server.listen(3000, function(){
    console.log("Initialized...");
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});


io.sockets.on('connection', function (socket) {

    socket.on('toServer', function (data) {
        var msg = data.name+":"+data.msg;
        socket.emit('toClient', msg);
        socket.broadcast.emit('toClient', msg);
    });
});