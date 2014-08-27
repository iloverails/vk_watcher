'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var VkUserSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    uid: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    mobileOnline: [{
        type: Date
    }],
    desktopOnline: [{
        type: Date
    }]
});

mongoose.model('VkUser', VkUserSchema);