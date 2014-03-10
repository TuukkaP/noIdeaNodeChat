'use strict';

angular.module('angularApp')
    .controller('MainCtrl', ["$scope", "$firebase", "$cookieStore", function ($scope, $firebase, $cookies) {
        var users = new Firebase("https://sizzling-fire-2622.firebaseio.com/users");
        $scope.messages = $firebase((new Firebase("https://sizzling-fire-2622.firebaseio.com/messages")).limit(50));
        $scope.users = $firebase(new Firebase("https://sizzling-fire-2622.firebaseio.com/users"));

        if ($scope.username == null) {
            $scope.username = prompt("What's your name?");
            var username = users.push();
            $cookies.username = $scope.username;
            username.set($scope.username);
        }

        $scope.chat = function() {
            var myDate = new Date();
            $scope.messages.$add({
                time: myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(),
                username: $cookies.username,
                message: $scope.chat.msg
            });
            $scope.chat.msg = '';
        };

        $scope.quit = function() {
//            $cookieStore.remove('username');
            username.remove();
            $scope.username = null;
        }

    }]);
