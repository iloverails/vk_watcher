'use strict';

var VK = require('vksdk');
var mongoose = require('mongoose'),
    VkUser = mongoose.model('VkUser');

exports.render = function(req, res) {
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};

exports.find_vk_user = function(req,res){
    var vk = new VK({
        'appID'     : 4525228,
        'appSecret' : 'S34YxjPWxxkTFYsIMo0i',
        'mode'      : 'sig'
    });
    vk.request('getProfiles', {
        'uids' : req.params.uid,
        'fields': 'first_name,last_name,nickname,screen_name,sex,city,country,timezone,photo,photo_medium,photo_big,has_mobile,rate,contacts,education,online,counters'
    });

    vk.on('done:getProfiles', function(vkUser) {
        res.jsonp(vkUser)
    });
};

exports.vkuser = function(req, res, next, id) {
    VkUser.load(id, function(err, vkuser) {
        if (err) return next(err);
        if (!vkuser) return next(new Error('Failed to load article ' + id));
        req.vkuser = vkuser;
        next();
    });
};


exports.show = function(req,res){
    VkUser.findOne({_id: req.params.vkuserId}).exec(function(err,user){
        res.jsonp(user);
    })
};

exports.create = function(req,res){
    var user = new VkUser(req.body);
    user.user = req.user._id;
    user.save(function(err){
        res.send(200)
    });
};

exports.all = function(req,res){
    VkUser.find().exec(function(err, users){
        res.jsonp(users)
    });
};