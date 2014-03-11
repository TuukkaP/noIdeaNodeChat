 'use strict';

var app = angular.module('angularApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angularMoment',
  'firebase'
]);

app.factory('socket', function(){
     return io.connect('/');
 });

app.factory('messages', function($firebase){
	return $firebase((new Firebase("https://*.firebaseio.com/messages")).limit(10));
});

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});

//app.service('userLogin', function () {
//     var username = "";
//
//     return {
//         login: function () {
//             return username;
//         },
//         logout: function (value) {
//             username = value;
//         }
//     };
// });
// app.factory('userListService', function(){
//     var users;
//     return {
//        getUsers: function() {
//            return users;
//        },
//        setUsers: function(userList) {
//            users = userList;
//        }
//     };
//     this.getUsers = function () {
//         return users;
//     };
//     this.setUsers = function(userList){
//         users = userList;
//     }
// });
