const {
  saveReviews,
  getReviewByProductId,
  updateReviewById,
  deleteReviewById,
  patchReviewById
} = require("../repository/review");

const mapReviewBody = review => ({
  product_id: review.productId,
  average_review_score: review.averageReviewScore,
  number_of_reviwes: review.numberOfReviwes
});

const mapReviewBodyForPatch = review => ({
  ...(review.productId && {
    product_id: review.productId
  }),

  ...(review.averageReviewScore && {
    average_review_score: review.averageReviewScore
  }),

  ...(review.numberOfReviwes && {
    number_of_reviwes: review.numberOfReviwes
  })
});

exports.saveReviews = async (fastify, request) => {
  const { review } = request.body.data;
  console.log("Save Review----", review);
  const response = await saveReviews.call(fastify, {
    review: mapReviewBody(review)
  });
  return { data: { review: response[0] } };
};

exports.updateReviewById = async (fastify, request) => {
  const { review } = request.body.data;
  const response = await updateReviewById.call(fastify, {
    review: mapReviewBody(review)
  });
  return response;
};

exports.getReviews = async (fastify, request) => {
  const { productId } = request.params;
  const response = await getReviewByProductId.call(fastify, {
    productId
  });
  return { data: { review: response[0] } };
};

exports.deleteReviewById = async (fastify, request) => {
  const { productId } = request.params;
  const response = await deleteReviewById.call(fastify, {
    productId
  });
  return response;
};

exports.patchReviewById = async (fastify, request) => {
  const { review } = request.body.data;
  const { productId } = request.params;
  const response = await patchReviewById.call(fastify, {
    productId,
    review: mapReviewBodyForPatch(review)
  });
  return { data: { review: response[0] } };
};
