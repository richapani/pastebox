'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash');
var path = require('path'),
    mongoose = require('mongoose'),
    Paste = mongoose.model('Paste'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Extend paste's controller
 */

exports.initPage = function (req, res) {
  res.render(path.resolve('modules/pastes/server/templates/init_page'));
}

exports.create = function (req, res) {
    var paste = new Paste();

  if (req.body.code == null) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage("Enter Proper Code.")
    })};
    //paste.code = new Buffer(req.code).toString('base64');
    paste.code = req.body.code;

    paste.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
          res.redirect('/api/paste/' + paste.Url);
        }
    });
}

exports.getAll = function (req, res) {
    Paste.find().exec(function (err, pastes) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(pastes);
        }
    });
}

exports.view = function (req, res) {
  var paste = req.paste;// ? req.paste.toJSON() : {};
  res.render(path.resolve('modules/pastes/server/templates/init_page'), {
    code: req.paste[0].code,
    name: 'Richa Pani'
  });
}

exports.pasteById = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Article is invalid'
        });
    }

    Paste.findById(id).exec(function (err, paste) {
        if (err) {
            return next(err);
        } else if (!paste) {
            return res.status(404).send({
                message: 'No article with that identifier has been found'
            });
        }
        req.paste = paste;
        next();
    });
};

exports.pasteByUrl = function (req, res, next, url) {
  Paste.find({ Url: url}, function (err, paste) {
    if (err) {
      return next(err);
    } else if(!paste) {
      return res.status(404).send({
        message: 'No Paste with this Url'
      });
    }
    req.paste = paste;
    next();
  });

}
