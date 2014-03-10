/**
 * Created by tuukka on 9.3.2014.
 */
var validator = require('validator');

module.exports = function (io) {

    var usernames = {};

    io.sockets.on('connection', function (socket) {

        socket.on('chatToServer', function (msg) {
            var myDate = new Date();
            socket.emit('chatToClient', myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(), socket.username, validator.escape(msg));
            socket.broadcast.emit('chatToClient', myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(), socket.username, msg);
        });

        socket.on('joinChat', function(rawusername){
            var myDate = new Date();
            var username = rawusername;
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
};
