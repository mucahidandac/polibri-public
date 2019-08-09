const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        var salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync("testtest", salt);
        return knex('users').insert([
            {id: 1, name:'Martina', email: 'martina@email.com', password: hashedPass},
            {id: 2, name:'Ahmet'  , email: 'ahmet@email.com'  , password: hashedPass},
            {id: 3, name:'Mucahid', email: 'mucahid@email.com', password: hashedPass},
            {id: 4, name:'Tester' , email: 'tester@email.com' , password: hashedPass},
        ]);
      });
  };
  