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
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    sex: {
        type: Number
    },
    nickname: {
        type: String
    },
    screen_name: {
        type: String
    },
    city: {
        type: Number
    },
    photo: {
        type: String
    },
    photo_medium: {
        type: String
    },
    photo_big: {
        type: String
    },
    users: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    online_dates:{
        type: Schema.ObjectId,
        ref: 'OnlineDates'
    }
});

mongoose.model('VkUser', VkUserSchema);