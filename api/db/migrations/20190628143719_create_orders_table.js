exports.up = function(knex, Promise) {
    return knex.schema.createTable('orders', function(t) {
        t.increments('id').unsigned().primary();
        t.enu('status', ['draft','reserve','completed']).notNull();
        t.integer('quantity').defaultTo(1).notNull();
        t.integer('book_id').unsigned().index().references('id').inTable('books').onDelete('SET NULL');
        t.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('SET NULL');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('orders');
};
