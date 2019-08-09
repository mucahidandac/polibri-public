
exports.up = function(knex, Promise) {
    return knex.schema.createTable('events', function(t) {
        t.increments('id').unsigned().primary();
        t.string('name').notNull();
        t.string('picture').nullable();
        t.string('address').nullable();
        t.date('startdate').nullable();
        t.date('enddate').nullable();
        
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('events');
};
