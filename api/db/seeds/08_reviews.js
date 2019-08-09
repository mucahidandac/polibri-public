
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {id: 1, book_id: 1, user_id:1 , rating:5, content: 'I loved this book'},
        {id: 2, book_id: 1, user_id:2 , rating:5, content: 'Breathtaking!!'},
        {id: 3, book_id: 2, user_id:1 , rating:4, content: 'Finished in 1 day!'},
        {id: 4, book_id: 1, user_id:3 , rating:1, content: 'It was boring'},
        {id: 5, book_id: 3, user_id:2 , rating:5, content: 'Everyone should read'},
        {id: 6, book_id: 3, user_id:3 , rating:4, content: 'Breathtaking!!'},
        {id: 7, book_id: 2, user_id:2 , rating:4, content: 'I loved this book'},
        {id: 8, book_id: 4, user_id:1 , rating:4, content: 'Finished in 1 day!'},
        {id: 9, book_id: 5, user_id:3 , rating:1, content: 'It was boring'},
        {id: 10, book_id: 4, user_id:2 , rating:5, content: 'Everyone should read'},
        {id: 11, book_id: 3, user_id:1 , rating:4, content: 'Breathtaking!!'},
        {id: 12, book_id: 5, user_id:1 , rating:4, content: 'I loved this book'}
      ]);
    });
};
