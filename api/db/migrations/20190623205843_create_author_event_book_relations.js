
exports.up = function(knex, Promise) {
    return knex.schema.createTable('writtenBys', function(table){
        table.increments().primary();
        table.integer('book_id').unsigned().index().references('id').inTable('books').onDelete('SET NULL');
        table.integer('author_id').unsigned().index().references('id').inTable('authors').onDelete('SET NULL');
    }).table('events', function(table){
        table.integer('book_id').unsigned().index().references('id').inTable('books').onDelete('SET NULL');
    }).table('books', function(table){
        table.integer('genre_id').unsigned().index().references('id').inTable('genres').onDelete('SET NULL');
        table.integer('theme_id').unsigned().index().references('id').inTable('themes').onDelete('SET NULL');
    }).createTable('similarities', function(table){
        table.increments().primary();
        table.integer('book_id').unsigned().index().references('id').inTable('books').onDelete('SET NULL');
        table.integer('similar_book_id').unsigned().index().references('id').inTable('books').onDelete('SET NULL');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTable('similarities')
    .table('books', function(table){
        table.dropColumn('genre_id');    
        table.dropColumn('theme_id');
    })
    .table('events', function(table){
        table.dropColumn('book_id');
    })
    .dropTable('writtenBys');
};
