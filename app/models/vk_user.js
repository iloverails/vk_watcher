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
    created_at: {
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
    onlineDates: [{
        type: Schema.ObjectId,
        ref: 'OnlineDates'
    }]

});

mongoose.model('VkUser', VkUserSchema);