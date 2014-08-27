'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$http', 'VkUser', '$routeParams', function ($scope, Global, $http, VkUser, $routeParams) {
    $scope.global = Global;

    $scope.find = function(){
        VkUser.query(function(vkUsers) {
            $scope.vkUsers = vkUsers;
        });
    }
    $scope.findOne = function(){
        VkUser.get({
            vkuserId: $routeParams.id
        }, function(vkuser) {
            $scope.vkUser = vkuser;
        });
    }

    $scope.findProfile = function(uid){
        $http.get('/find_vk_users/'+uid).success(function(res){
            if (!res.error)
                $scope.foundUser = res.response[0];
        })
    };

    $scope.addProfile = function(foundUser){
        var vkUser = new VkUser(foundUser);
        vkUser.$save(function(response) {
            console.log(response)
        });
    };
}]);