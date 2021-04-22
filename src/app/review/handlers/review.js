const HttpStatus = require("http-status-codes");
const {
  saveReviews,
  getReviews,
  updateReviewById,
  deleteReviewById,
  patchReviewById
} = require("../services/review");

exports.saveReviews = async function saveReviewsHandler(request, reply) {
  console.log("--------Save Handler------------");
  const response = await saveReviews(this, request);
  console.log("Handler Save Response------", response);
  return reply.code(HttpStatus.CREATED).send(response);
  // return reply.send("Hello");
};

exports.getReviews = async function getReviewsHandler(request, reply) {
  const response = await getReviews(this, request);
  return reply.code(HttpStatus.OK).send(response);
};

exports.updateReviewById = async function updateReviewHandler(request, reply) {
  console.log("--------Update Handler------------");
  const { statusCode, response } = await updateReviewById(this, request);
  return reply.code(statusCode).send({ data: { review: response[0] } });
};

exports.patchReviewById = async function patchReviewHandler(request, reply) {
  const response = await patchReviewById(this, request);
  console.log("Handler Patch Response------", response);
  return reply.code(HttpStatus.OK).send(response);
};

exports.deleteReviewById = async function deleteReviewHandler(request, reply) {
  console.log("--------Delete Handler------------");
  const response = await deleteReviewById(this, request);
  return reply.code(HttpStatus.OK).send(response);
};


