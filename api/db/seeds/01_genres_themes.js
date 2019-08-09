
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('genres').del()
    .then(function () {
      return knex('genres').insert([
        {id: 1, name: 'genre1', display_name: 'Art'},
        {id: 2, name: 'genre2', display_name: 'History'},
        {id: 3, name: 'genre3', display_name: 'Classics'},
        {id: 4, name: 'genre4', display_name: 'Philosophy'},
        {id: 5, name: 'genre5', display_name: 'Science'}
      ]);
    })
    .then(function () {
      return knex('themes').del()
      .then(function () {
        return knex('themes').insert([
          {id: 1, name: 'theme1', display_name: 'Love'},
          {id: 2, name: 'theme2', display_name: 'Death'},
          {id: 3, name: 'theme3', display_name: 'Power'},
          {id: 4, name: 'theme4', display_name: 'Courage'},
          {id: 5, name: 'theme5', display_name: 'Society'}
        ]);
      })
    });
};
