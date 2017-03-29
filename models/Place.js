let bookshelf = require('../bookshelf');
require('./Dish');

module.exports = bookshelf.model('Place', {
  tableName: 'places',
  hasTimestamps: true,

  dishes() {
    return this.hasMany('Dish');
  }
},{
  dependents: ['dishes']
});