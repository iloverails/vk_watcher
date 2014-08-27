'use strict';

module.exports = function(app) {
    
    // Home route
    var index = require('../controllers/index');
    app.get('/', index.render);
    app.get('/find_vk_users/:uid', index.find_vk_user);

    app.get('/vk_users', index.all);
    app.post('/vk_users',index.create);
    app.get('/vk_users/:vkuserId', index.show);
//        .put(index.update)
//        .delete(index.destroy);

    app.param('articleId', index.vkuser);
};
