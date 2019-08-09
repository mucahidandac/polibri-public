
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('similarities').del()
    .then(function () {
      // Inserts seed entries
      return knex('similarities').insert([
        {id: 1, book_id: 2, similar_book_id:3},
        {id: 2, book_id: 3, similar_book_id:2},
        {id: 3, book_id: 4, similar_book_id:2},
        {id: 4, book_id: 2, similar_book_id:4}
      ]);
    });
};
