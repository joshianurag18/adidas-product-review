const fp = require("fastify-plugin");
const knex = require("knex");
const knexStringcase = require("knex-stringcase");
const setupPaginator = require("./paginator");
const { connectionCheck } = require("../../commons/helpers");

const knexPlugin = async (fastify, options) => {
  try {
    console.log(options);
    const db = knex(knexStringcase(options));
    setupPaginator(db);
    await connectionCheck(db);
    fastify.decorate("knex", db);
  } catch (e) {
    fastify.log.error(`DB connection failed: ${fastify.config.NODE_ENV}`);
    throw Error(`Connection Failed ${e}`);
  }
};

module.exports = fp(knexPlugin);
