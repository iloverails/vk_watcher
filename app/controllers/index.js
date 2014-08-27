'use strict';

var VK = require('vksdk');
var mongoose = require('mongoose'),
    _ = require('lodash'),
    async = require('async'),
    config = require('../../config/config'),
    VkUser = mongoose.model('VkUser'),
    OnlineDates = mongoose.model('OnlineDates');

exports.render = function(req, res) {
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};
//update online statuses
setTimeout(function(){
    VkUser.find().exec(function(err, users){
        if (users.length>0){
            var uids = [];
            _.each(users, function(user){
                uids.push(user.uid);
            });
            var vk = new VK(config.vk);
            vk.request('getProfiles', {
                'uids' : uids,
                'fields': 'has_mobile,online'
            });

            vk.on('done:getProfiles', function(vkUsers) {
                var f = [];
                _.each(vkUsers.response, function(vkuser){
                    f.push(function(cb){
                        OnlineDates.findOne({}, {}, { sort: { 'created_at' : -1 } }).exec(function(err, onlineDate){
                            if (onlineDate){
                                if (vkuser.online==0){
                                    if (!onlineDate.end)
                                        onlineDate.end = new Date();
                                }else{
                                    if (onlineDate.end)
                                        onlineDate = new OnlineDates({start: new Date(), uid: vkuser.uid})
                                }
                            }else{
                                onlineDate = new OnlineDates({start: new Date(), uid: vkuser.uid})
                            }
                            onlineDate.save(function(err){

                                cb()
                            });
                        });
                    });
                });
                async.series(f, function(){
                    console.log('updated')
                })
            });
        }
    })
},5000);

exports.vkuser = function(req, res, next, id) {
    VkUser.load(id, function(err, vkuser) {
        if (err) return next(err);
        if (!vkuser) return next(new Error('Failed to load article ' + id));
        req.vkuser = vkuser;
        next();
    });
};


exports.show = function(req,res){
    var vk = new VK(config.vk);
    vk.request('getProfiles', {
        'uids' : req.params.vkuserId,
        'fields': 'first_name,last_name,nickname,screen_name,sex,city,country,timezone,photo,photo_medium,photo_big,has_mobile,rate,contacts,education,online,counters'
    });

    vk.on('done:getProfiles', function(vkUser) {
        res.jsonp(vkUser)
    });
};

exports.create = function(req,res){
    var user = new VkUser(req.body);
    user.user = req.user._id;
    user.save(function(err){
        res.jsonp(user)
    });
};

exports.all = function(req,res){
    VkUser.find({user: req.user._id}).exec(function(err, users){
        if (users.length>0){
            var uids = [];
            _.each(users, function(user){
                uids.push(user.uid);
            });
            var vk = new VK(config.vk);
            vk.request('getProfiles', {
                'uids' : uids,
                'fields': 'has_mobile,online,photo,photo_big,photo_medium'
            });
            vk.on('done:getProfiles', function(vkUsers) {
                res.jsonp(vkUsers.response)
            });

        }else{
            res.jsonp([])
        }
    });
};