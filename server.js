var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

server.listen(3000, function(){
    console.log("Initialized...");
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

// usernames which are currently connected to the chat
var usernames = {};

io.sockets.on('connection', function (socket) {

    socket.on('chatToServer', function (msg) {
        var myDate = new Date();
        socket.emit('chatToClient', myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(), socket.username, msg);
        socket.broadcast.emit('chatToClient', myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(), socket.username, msg);
    });

    socket.on('joinChat', function(username){
        var myDate = new Date();
        socket.username = username;
        usernames[username] = username;
        socket.emit('chatToClient',  myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(), 'SERVER', ' you have connected');
        socket.broadcast.emit('chatToClient',  myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(), 'SERVER', username + ' has connected');
        io.sockets.emit('userList', usernames);
    });

    socket.on('disconnect', function(){
        var myDate = new Date();
        delete usernames[socket.username];
        io.sockets.emit('userList', usernames);
        socket.broadcast.emit('chatToClient',  myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(), socket.username, 'disconnected');
    });
});