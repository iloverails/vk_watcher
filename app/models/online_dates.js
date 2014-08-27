
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var OnlineDatesSchema = new Schema({
    vkusers: {
        type: Schema.ObjectId,
        ref: 'VkUser'
    },
    mobile: [{
        type: Date
    }],
    desktop: [{
        type: Date
    }]

});

mongoose.model('OnlineDates', OnlineDatesSchema);