var bookshelf  = require('../utils').bookshelf;

require('./bookModel');
require('./userModel');

module.exports = bookshelf.model('Order', {
  tableName: 'orders',
  book() { return this.belongsTo('Book'); },
  user() { return this.belongsTo('User'); }
});

