 'use strict';

var app = angular.module('angularApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
]);

 app.factory('socket', function(){
     return io.connect('/');
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
