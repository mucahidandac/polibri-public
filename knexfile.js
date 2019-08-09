module.exports = {
    development: {
        client: 'pg',
        connection: {
          host: "",
          port: "",
          user: "",
          password: "",
          database: "",
          ssl: true
        },
        searchPath: ['knex', 'public'],
        
      pool: {
        min: 0,
        max: 100,
      },
      migrations: {
        directory: './api/db/migrations',
        tableName: 'knex_migrations',
      },
      seeds: {
        directory: './api/db/seeds',
      },
    }
  }