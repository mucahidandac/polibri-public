var bookshelf  = require('../utils').bookshelf;

require('./authorModel');
require('./genreModel');
require('./themeModel');
require('./reviewModel');

module.exports = bookshelf.model('Book', {
  tableName: 'books',
  authors() { return this.belongsToMany('Author','writtenBys','author_id','book_id'); },
  similarities() { return this.belongsToMany('Book','similarities','similar_book_id','book_id'); },
  events() { return this.hasMany('Event')},
  genre() { return this.belongsTo('Genre'); },
  theme() { return this.belongsTo('Theme'); },
  reviews() { return this.hasMany('Review'); }
});

