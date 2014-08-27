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

    $scope.toDateTime = function(date){
        if (date){
            var date = new Date(date);
            return date.toDateString() + ' ' + date.toLocaleTimeString()
        }else
            return 'online now'
    }

    $scope.getDayOfWeek = function(date){
        date = new Date(date)
        var dayArr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        return dayArr[date.getDay()-1]
    }

    $scope.getTime = function(d1,d2){
        if (d1 && d2){
            var timestamp = new Date(d2) - new Date(d1)
            console.log(new Date(d1), new Date(d2))
            var delta = Math.abs(timestamp) / 1000;
            var days = Math.floor(delta / 86400);
            delta -= days * 86400;
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            var seconds = delta % 60;

            return hours + 'h : ' + minutes.toFixed(2) + 'm : ' + seconds.toFixed(2) + ' s';

        }else
            return ''
    }
}]);