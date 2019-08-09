var bookshelf  = require('../utils').bookshelf;

require('./bookModel');

module.exports = bookshelf.model('Event', {
  tableName: 'events',
  book() { return this.belongsTo('Book'); }
});

