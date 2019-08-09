
exports.up = function(knex, Promise) {
    return knex.schema.createTable('authors', function(t) {
        t.increments('id').unsigned().primary();
        t.string('name').notNull();
        t.text('shortbio').nullable();
        t.string('picture').nullable();
        
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('authors');
};
