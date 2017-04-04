const authToken = require('./auth-token');
const bookshelf = require('../bookshelf');
const knex = bookshelf.knex;

module.exports = {
  requireAuthentication: function requireAuthentication(req, res, next) {
    try {
      let header = req.header('Authorization');
      let token = header.split(' ')[1];

      var payload = authToken.decode(token);
      knex('users').where({ id: payload.user_id }).then((rows) => {
      	if (rows.error) return next(rows.error);
      	const user = rows[0];
        if (!user) next(new Error('Invalid Authorization token.'));

        req.user = user;
        req.user.is_admin = user.role === 'admin' || user.role === 'staff';
        req.user.is_staff = user.role === 'staff';
        req.user.token = token;
        req.session.user = req.user;
        next();
      });
    } catch (e) {
      console.error('Invalid authorization header. ', e.message);
      next({ status: 401 });

    }
  }
};
