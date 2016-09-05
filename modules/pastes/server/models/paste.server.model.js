'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  validator = require('validator'),
  randomstring = require("randomstring");

/**
 * Link Schema
 */
var PasteSchema = new Schema({
  Url: {
    type: String,
    trim: true,
    default: ''
  },
  displayName: {
    type: String,
    trim: true,
    default: ''
  },
    code: {
      type: String,
      required: 'Please fill the Code',
      trim: true
    },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

/**
 * Hook a pre save method to hash the password
 */
PasteSchema.pre('save', function (next) {
  this.Url = randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    });
  next();
});


mongoose.model('Paste', PasteSchema);
