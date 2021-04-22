const path = require("path");

const defaultDbConfig = {
  client: "postgres",
  pool: { min: 2, max: 10 },
  acquireConnectionTimeout: 10000,
  migrations: {
    tableName: "knex_migrations",
    directory: path.resolve(__dirname, "../migrations")
  }
};

module.exports = {
  dev: {
    ...defaultDbConfig,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    asyncStackTraces: true,
    debug: true
  },
  test: {
    ...defaultDbConfig,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    asyncStackTraces: true,
    debug: true
  }
};
