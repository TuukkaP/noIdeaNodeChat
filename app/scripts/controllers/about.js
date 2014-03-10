'use strict';

angular.module('angularApp')
    .controller('AboutCtrl', function ($scope, $cookieStore) {
        $scope.sname =  $cookieStore.get('username');
    });
