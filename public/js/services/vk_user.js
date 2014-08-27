angular.module('mean.system').factory('VkUser', ['$resource',
    function($resource) {
        return $resource('vk_users/:vkuserId', {
            vkuserId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);