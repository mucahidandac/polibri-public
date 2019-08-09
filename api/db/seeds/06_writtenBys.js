exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('writtenBys').del()
    .then(function () {
      // Inserts seed entries
      return knex('writtenBys').insert([
        {id: 1, book_id: 1, author_id:1},
        {id: 2, book_id: 2, author_id:2},
        {id: 3, book_id: 3, author_id:3},
        {id: 4, book_id: 4, author_id:4},
        {id: 5, book_id: 5, author_id:5},
      ]);
    });
};
