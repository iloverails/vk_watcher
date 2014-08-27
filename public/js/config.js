'use strict';

angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/index.html'
            }).
            when('/profile/:vkuserId', {
                templateUrl: 'views/profile.html'
            }).otherwise({
                redirectTo: '/'
            });
    }
]);

//Setting HTML5 Location Mode
//angular.module('mean').config(['$locationProvider',
//  function($locationProvider) {
//    $locationProvider.hashPrefix('!');
//}
//]);
