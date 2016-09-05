'use strict';

module.exports = function (app) {
  // User Routes
  var pastes = require('../controllers/pastes.server.controller');

//  app.route('paste/:url')
//    .get(pastes.view);
    //.post(paste.updateByUrl);

  // Setting up the users profile api
  app.route('/api/paste').get(pastes.initPage)
                          .post(pastes.create);

  app.route('/api/paste/:url').get(pastes.view);

  // Finish by binding the user middleware
  app.param('pasteId', pastes.pasteById);
  app.param('url', pastes.pasteByUrl);
};
