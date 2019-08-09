
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, name: 'Kingdom Meeting ', picture: '/assets/img/event1.jpg', book_id: 1, address:'', startdate:'2019-03-29T00:00:00.000Z', enddate:'2019-03-30T00:00:00.000Z'},
        {id: 2, name: 'Night in Milan', picture: '/assets/img/event2.jpg', book_id: 2, address:'', startdate:'2019-07-27T00:00:00.000Z', enddate:'2019-07-29T00:00:00.000Z'},
        {id: 3, name: 'What a Hurricane', picture: '/assets/img/event3.jpg', book_id: 3, address:'', startdate:'2019-06-26T00:00:00.000Z', enddate:'2019-06-29T00:00:00.000Z'},
        {id: 4, name: 'Crime or Not', picture: '/assets/img/event4.jpg', book_id: 4, address:'', startdate:'2019-08-24T00:00:00.000Z', enddate:'2019-08-29T00:00:00.000Z'},
        {id: 5, name: 'Love Eat and Pray', picture: '/assets/img/event5.jpg', book_id: 5, address:'', startdate:'2019-07-02T00:00:00.000Z', enddate:'2019-07-20T00:00:00.000Z'},
      ]);
    });
};
