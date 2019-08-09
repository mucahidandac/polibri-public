var bookshelf  = require('../utils').bookshelf;

require('./bookModel');

module.exports = bookshelf.model('Author', {
  tableName: 'authors',
  books() { return this.belongsToMany('Book','writtenBys','book_id','author_id'); }
});

