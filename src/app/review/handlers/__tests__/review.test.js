const { create } = require("../../../../index");

const service = require("../../services/review");

const { getReviewResponse } = require("../mocks/review");

jest.mock("knex", () => () => ({}));

jest.mock("../../../commons/helpers", () => ({
  connectionCheck: jest.fn().mockResolvedValue()
}));

jest.mock("../../services/review");
let fastify;
let reply;
describe("REVIEW handlers test", () => {
  beforeAll(async () => {
    fastify = create();
    reply = {
      code: jest.fn()
    };
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await fastify.close();
  });

  describe("GET REVIEW Handlers test", () => {
    test("getReview by ids should return 200, in case of success", async () => {
      service.getReviews.mockResolvedValueOnce(getReviewResponse);
      const response = await fastify.inject({
        method: "GET",
        url: "/v1/reviews/5499",
        accept: "application/json"
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(getReviewResponse);
    });
  });

  describe("SAVE REVIEW Handlers test", () => {
    test("saveReviews should return 201, in case of success", async () => {
      // saveReviews.mockResolvedValue(getReviewResponse);
      service.saveReviews.mockResolvedValueOnce(getReviewResponse);
      const response = await fastify.inject({
        method: "POST",
        url: "/v1/reviews",
        accept: "application/json",
        payload: {
          data: {
            review: {
              productId: "54999",
              averageReviewScore: "1",
              numberOfReviwes: "1"
            }
          }
        }
      });
      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.payload)).toEqual(getReviewResponse);
    });
  });

  describe("UPDATE REVIEW Handlers test", () => {
    test("updateReviewById should return 200, in case of success when resource already exist", async () => {
      service.updateReviewById.mockResolvedValueOnce({
        statusCode: 200,
        response: getReviewResponse.data.review
      });
      const response = await fastify.inject({
        method: "PUT",
        url: "/v1/reviews/876",
        accept: "application/json",
        payload: {
          data: {
            review: {
              productId: "543",
              averageReviewScore: "876",
              numberOfReviwes: "1"
            }
          }
        }
      });
      expect(response.statusCode).toBe(200);
    });

    test("updateReviewById should return 201, in case of success when resource does not exist", async () => {
      service.updateReviewById.mockResolvedValueOnce({
        statusCode: 201,
        response: getReviewResponse.data.review
      });
      const response = await fastify.inject({
        method: "PUT",
        url: "/v1/reviews/876",
        accept: "application/json",
        payload: {
          data: {
            review: {
              productId: "543",
              averageReviewScore: "876",
              numberOfReviwes: "1"
            }
          }
        }
      });
      expect(response.statusCode).toBe(201);
    });
  });

  describe("PATCH REVIEW Handlers test", () => {
    test("patchReviewById should return 200, in case of success", async () => {
      service.patchReviewById.mockResolvedValueOnce(getReviewResponse);
      const response = await fastify.inject({
        method: "PATCH",
        url: "/v1/reviews/543",
        accept: "application/json",
        payload: {
          data: {
            review: {
              averageReviewScore: "4"
            }
          }
        }
      });
      expect(response.statusCode).toBe(200);
      expect(
        JSON.parse(response.payload).data.review.averageReviewScore
      ).toEqual("4");
    });
  });

  describe("DELETE REVIEW Handlers test", () => {
    test("deleteReviewById should return 200, in case of success", async () => {
      service.deleteReviewById.mockResolvedValueOnce({
        data: { success: true }
      });
      const response = await fastify.inject({
        method: "DELETE",
        url: "/v1/reviews/5000",
        accept: "application/json"
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual({
        data: { success: true }
      });
    });
  });
});
