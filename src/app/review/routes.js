
const {
  getReviewSchema,
  saveReviewSchema,
  updateReviewSchema,
  deleteReviewByIdSchema,
  patchReviewSchema
} = require("./schemas/review");

const {
  saveReviews,
  getReviews,
  updateReviewById,
  deleteReviewById,
  patchReviewById
} = require("./handlers/review");

module.exports = async fastify => {

  fastify.route({
    method: "POST",
    url: "/reviews",
    schema: saveReviewSchema,
    preValidation: [fastify.authenticate],
    handler: saveReviews,
    
  });

  fastify.route({
    method: "GET",
    url: "/reviews/:productId",
    schema: getReviewSchema,
    handler: getReviews
  });
  fastify.route({
    method: "PUT",
    url: "/reviews/:productId",
    schema: updateReviewSchema,
    preValidation: [fastify.authenticate],
    handler: updateReviewById
  });
  fastify.route({
    method: "DELETE",
    url: "/reviews/:productId",
    schema: deleteReviewByIdSchema,
    preValidation: [fastify.authenticate],
    handler: deleteReviewById
  });
  fastify.route({
    method: "PATCH",
    url: "/reviews/:productId",
    schema: patchReviewSchema,
    preValidation: [fastify.authenticate],
    handler: patchReviewById
  })
};
