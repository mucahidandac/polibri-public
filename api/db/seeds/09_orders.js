
exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      // return knex('orders').insert([
      //   {id: 1, status: 'draft', quantity: 1, book_id: 1, user_id: 2},
      //   {id: 2, status: 'reserve', quantity: 1, book_id: 2, user_id: 1},
      //   {id: 3, status: 'reserve', quantity: 2, book_id: 3, user_id: 1},
      //   {id: 4, status: 'draft', quantity: 1, book_id: 1, user_id: 2},
      //   {id: 5, status: 'draft', quantity: 1, book_id: 2, user_id: 2},
      //   {id: 6, status: 'completed', quantity: 1, book_id: 2, user_id: 1},
      //   {id: 7, status: 'draft', quantity: 1, book_id: 1, user_id: 2},
      //   {id: 8, status: 'draft', quantity: 1, book_id: 4, user_id: 1},
      //   {id: 9, status: 'completed', quantity: 1, book_id: 2, user_id: 3}
      // ]);
    });
};
