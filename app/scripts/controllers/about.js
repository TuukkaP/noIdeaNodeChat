'use strict';

angular.module('angularApp')
    .controller('AboutCtrl', ["$scope", "$firebase", "$cookieStore", function ($scope, $firebase, $cookieStore) {
        $scope.username =  $cookieStore.get("username");
    }]);
