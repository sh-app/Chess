'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    const body = req.body;

    app.service('users').create({
      username: body.username,
      password: body.password
    })
    .then(user => res.redirect('/lobby'))
    .catch(next);
  };
};
