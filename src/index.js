// Require the framework and instantiate it
const fastify = require("fastify")({
  logger: true
});

const oas = require("fastify-oas");
const fastifyJwt = require('fastify-jwt')
const fastifyEnv = require("fastify-env");
require("dotenv").config();
const cors = require("fastify-cors");
const fastifyRoutes = require("fastify-routes");
const knex = require("./app/plugins/knex");
const authenticate = require("./app/plugins/authenticate");
const { knexConfig } = require("../config/index");
const routes = require("./app");
const { extractLogTrace, methodNotFoundHandler } = require("./app/hooks");
const { envSchema: schema } = require("./app/commons/schema");

const envOptions = {
  dotenv: true,
  schema
};

function create() {
  // Run the server!

  fastify.register(fastifyEnv, envOptions);
  fastify.register(fastifyRoutes);
  fastify.register(cors);

   // Auth
   fastify.register(authenticate);

  // routes
  fastify.register(routes);

 

  // knex connection
  fastify.register(knex, knexConfig[process.env.NODE_ENV]);

  //fastify.register(fastifyJwt, { secret: 'asecretthatsverylongandimportedfromanenvfile' })

  fastify.get('/token', (req, reply) => {
    const token = fastify.jwt.sign({ username: 'Adidas', hello: 'Review Application' })
    reply.send({ token })
  })

  fastify.register(oas, {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "Review API",
        description: "API Docs for the Review API",
        version: "0.1.0"
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here"
      },
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"]
    },
    exposeRoute: true
  });

  return fastify;
  // hooks
  // fastify.addHook("onRequest", extractLogTrace);
  // fastify.addHook("preParsing", methodNotFoundHandler(fastify));
}

function init(fastifyS) {
  fastifyS.listen(3001, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
  });
}

async function start() {
  const fastifyS = create();
  init(fastifyS);
}

try {
  // if not in test run either the command or start() if no command specified
  if (process.env.NODE_ENV !== "test") {
    start();
  }
} catch (err) {
  // eslint-disable-next-line no-console
  logger.error(
    err,
    `Invalid arg '${process.argv[2]}'. Please supply: 'start' OR 'docs'`
  );
}

//start();

module.exports = {
  create,
  start
};
