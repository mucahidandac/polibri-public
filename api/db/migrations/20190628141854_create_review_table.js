
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reviews', function(t) {
        t.increments('id').unsigned().primary();
        t.text('content').notNull();
        t.integer('rating').notNull();
        t.integer('book_id').unsigned().index().references('id').inTable('books').onDelete('SET NULL');
        t.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('SET NULL');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reviews');
};
