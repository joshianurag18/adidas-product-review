const reviewRoutes = require("./review/routes");
const { errorHandler } = require("./errorHandler");

module.exports = async fastify => {
  fastify.setErrorHandler(errorHandler());
  fastify.register(reviewRoutes, { prefix: "/v1" });
};
