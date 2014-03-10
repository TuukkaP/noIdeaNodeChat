'use strict';

angular.module('angularApp')
    .controller('MainCtrl', ["$scope", "$firebase", "$cookieStore", "socket", "$route", function ($scope, $firebase, $cookieStore, socket, $route) {
        $scope.messages = $firebase((new Firebase("https://*.firebaseio.com/messages")).limit(10));
        $scope.users = [];

        socket.on('connect', function(){
            socket.emit('users');
            if (typeof $cookieStore.get('username') !== "undefined") {
                $scope.username = $cookieStore.get('username');
                socket.emit('joinChat', $scope.username);
            }
        });

        angular.element(document).ready(function () {
            if (socket.socket.connected === true && typeof $cookieStore.get('username') !== "undefined") {
                $scope.username = $cookieStore.get('username');
                socket.emit('users');
            }
        });

        $scope.login = function() {
            console.log("Login kutsuttu");
            $scope.username = prompt("What's your name?");
            socket.emit('joinChat', $scope.username);
            $cookieStore.put('username', $scope.username);
        };

        socket.on('chatToClient', function (time, username, msg) {
            $scope.messages.$add({
                time: time,
                username: username,
                message: msg
            });
        });

        $scope.chat = function() {
            $scope.messages.$add({
                time: new Date().toString(),
                username: $scope.username,
                message: $scope.chat.msg
            });
            $scope.chat.msg = '';
        };

        socket.on('userList', function(data) {
            $scope.$apply(function () {
                $scope.users = data;
                console.log(data);
            });
        });

        $scope.quit = function() {
            $cookieStore.remove('username');
            delete $scope.username;
            socket.disconnect();
            $route.reload();
        };
    }]);


