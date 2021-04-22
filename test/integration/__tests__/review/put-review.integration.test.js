const randomstring = require("randomstring");
const { create } = require("../../../../src/index");
const { headers } = require("../../__mocks__/review");

describe("PUT review Integration Test", () => {
  let fastify;

  beforeAll(async () => {
    fastify = await create();
    // await fastify.ready();
  });

  /* afterAll(() => {
    fastify.knex.destroy();
  }); */

  describe("Create or Update review by product id", () => {
    it("should create review for product id - success case", async () => {
      const randomProductId = randomstring.generate(5);
      const requestReview = {
        data: {
          review: {
            productId: randomProductId,
            averageReviewScore: "4",
            numberOfReviwes: "1"
          }
        }
      };

      const response = await fastify.inject({
        method: "PUT",
        url: `/v1/reviews/${randomProductId}`,
        accept: "application/json",
        payload: requestReview,
        headers
      });

      expect(response.statusCode).toBe(201);
    });

    it("should return error when product review already exist", async () => {
      const randomProductId = randomstring.generate(5);
      const requestReview = {
        data: {
          review: {
            productId: randomProductId,
            averageReviewScore: "4",
            numberOfReviwes: "1"
          }
        }
      };

      const response = await fastify.inject({
        method: "PUT",
        url: `/v1/reviews/${randomProductId}`,
        accept: "application/json",
        payload: requestReview,
        headers
      });

      expect(response.statusCode).toBe(201);

      const responseP = await fastify.inject({
        method: "PUT",
        url: `/v1/reviews/${randomProductId}`,
        accept: "application/json",
        payload: requestReview,
        headers
      });
      expect(responseP.statusCode).toBe(200);
    });
  });
});
