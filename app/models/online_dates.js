
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
    uid: {
        type: String
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    }

});

mongoose.model('OnlineDates', OnlineDatesSchema);