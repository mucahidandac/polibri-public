
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', function(t) {
        t.increments('id').unsigned().primary();
        t.string('name').notNull();
        t.text('abstract').nullable();
        t.decimal('price').nullable();
        t.text('picture').nullable();

    }).createTable('genres', function(t) {
        t.increments('id').unsigned().primary();
        t.string('name').notNull();
        t.string('display_name').notNull();
        t.unique('name');
    }).createTable('themes', function(t) {
        t.increments('id').unsigned().primary();
        t.string('name').notNull();
        t.string('display_name').notNull();
        t.unique('name');
    });;
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('themes').dropTable('genres').dropTable('books');
};
