const {
  saveReviews,
  getReviews,
  updateReviewById,
  deleteReviewById,
  patchReviewById
} = require("../review");

const repository = require("../../repository/review");

const { reviewResponse, requestBody } = require("../mocks/review");

jest.mock("../../repository/review");

const request = {};
const fastify = {};

describe("REVIEW Service", () => {
  test("getReview by id should give transformed response", async () => {
    request.params = { productId: "123" };
    repository.getReviewByProductId.mockResolvedValueOnce(reviewResponse);
    const response = await getReviews(fastify, request);
    expect(response).toEqual({ data: { review: reviewResponse[0] } });
  });

  test("saveReview should return saved data", async () => {
    request.body = { data: requestBody };
    repository.saveReviews.mockResolvedValueOnce(reviewResponse);
    const response = await saveReviews(fastify, request);
    expect(response).toEqual({ data: { review: reviewResponse[0] } });
  });

  test("updateReviewById should return saved data", async () => {
    request.body = { data: requestBody };
    repository.updateReviewById.mockResolvedValueOnce({
      statusCode: 200,
      response: reviewResponse
    });
    const response = await updateReviewById(fastify, request);
    expect(response).toEqual({ statusCode: 200, response: reviewResponse });
  });

  test("deleteReviewById should delete review", async () => {
    request.params = { id: 123 };
    repository.deleteReviewById.mockResolvedValueOnce({
      data: { success: true }
    });
    const response = await deleteReviewById(fastify, request);
    expect(response).toEqual({ data: { success: true } });
  });

  test("patchReviewy should update review", async () => {
    // request.params = { id: 123 };
    request.body = { data: requestBody };
    repository.patchReviewById.mockResolvedValueOnce(reviewResponse);
    const response = await patchReviewById(fastify, request);
    expect(response).toEqual({ data: { review: reviewResponse[0] } });
  });
});
