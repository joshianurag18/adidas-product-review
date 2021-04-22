/* eslint-disable max-depth, global-require */
const HttpStatus = require("http-status-codes");

// eslint-disable-next-line complexity
module.exports = fastify => async (request, reply) => {
  const { match } = require("path-to-regexp");
  const url = request.req.url.split("?")[0];
  const method = request.req.method.toLowerCase();

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of fastify.routes.entries()) {
    if (!key.includes("docs") && !key.includes("*")) {
      const matchRoute = match(key, { decode: decodeURIComponent });
      const isRouteMatch = matchRoute(url);
      const isMethodMatch = Object.prototype.hasOwnProperty.call(value, method);
      if (isRouteMatch) {
        if (!isMethodMatch) {
          return reply.code(HttpStatus.METHOD_NOT_ALLOWED).send({
            errors: [
              {
                code: "INVALID_METHOD",
                message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED)
              }
            ]
          });
        }
        return undefined;
      }
    }
  }
  return undefined;
};
