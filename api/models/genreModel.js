var bookshelf  = require('../utils').bookshelf;

module.exports = bookshelf.model('Genre', {
  tableName: 'genres'
});

