'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$location', 'VkUser', '$routeParams', function ($scope, Global, $location, VkUser, $routeParams) {
    $scope.global = Global;
    $scope.vkUsers = [];
    $scope.find = function(){
        VkUser.query(function(vkUsers) {
            $scope.vkUsers = vkUsers;
        });
    }
    $scope.findOne = function(){
        VkUser.get({
            vkuserId: $routeParams.vkuserId
        }, function(vkuser) {
            if (!vkuser.error)
                $scope.vkUser = vkuser.response[0];
        });
    }

    $scope.findProfile = function(uid){
        VkUser.get({
            vkuserId: uid
        }, function(vkuser) {
            if (!vkuser.error)
                $scope.foundUser = vkuser.response[0];
        });
    };

    $scope.addProfile = function(foundUser){
        var vkUser = new VkUser(foundUser);
        vkUser.$save(function(user) {
            VkUser.get({
                vkuserId: user.uid
            }, function(vkuser) {
                if (!vkuser.error){
                    $scope.vkUsers.push(vkuser.response[0]);
                    $scope.foundUser = '';
                }
            });
        });
    };

    $scope.openProfile = function(uid){
        $location.path('/profile/'+uid)
    }
}]);