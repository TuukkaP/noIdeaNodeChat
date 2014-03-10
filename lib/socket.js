/**
 * Created by tuukka on 9.3.2014.
 */

var Firebase = require('firebase');
var msgref = new Firebase('https://sizzling-fire-2622.firebaseio.com/messages');

module.exports = function (io) {

    var msg = msgref.push();

    var users = [];

    var serverMsg = function (message) {
        var myDate = new Date();
        var msg = msgref.push();
        msg.set({
            time: new Date().toString(),
            username: "SERVER",
            message: message
        });
    }

    var idFinder = function(userid) {
        var index = -1;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === userid) {
                index = i;
            }
        }
        return index;
    };

    io.sockets.on('connection', function (socket) {

        socket.on('joinChat', function(username){
//            var myDate = new Date();
            //Etsitään käyttäjän indeksi listasta
            // Jos indeksiä ei löytynyt lisätään se listaan.
            if (idFinder(socket.id) < 0) {
                users.push({username: username, id: socket.id});
                serverMsg(username + ' has connected');
//                socket.emit('chatToClient',  myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(), 'SERVER', username + ' has connected');
            }
            socket.username = username;
            io.sockets.emit('userList', users);
        });

        socket.on('users', function(){
            socket.emit('userList', users);
        });

        socket.on('disconnect', function(){
//            var myDate = new Date();
            var index = idFinder(socket.id);
            if (index > -1) {
                users.splice(index, 1);
                socket.broadcast.emit('userList', users);
                serverMsg(socket.username + ' has disconnected');
            }
//            io.sockets.socket(users[0].id).emit('chatToClient',  myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(), socket.username, ' disconnected');
        });
    });
};