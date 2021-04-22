const randomstring = require("randomstring");
const { create } = require("../../../../src/index");
const { headers } = require("../../__mocks__/review");

describe("PATCH review Integration Test", () => {
  let fastify;

  beforeAll(async () => {
    fastify = await create();
    // await fastify.ready();
  });

  /* afterAll(() => {
    fastify.knex.destroy();
  }); */

  describe("Delete review by product id", () => {
    it("should delete review for product id - success case", async () => {
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

      const requestReviewPatch = {
        data: {
          review: {
            productId: randomProductId,
            averageReviewScore: "10"
          }
        }
      };

      const responseDelete = await fastify.inject({
        method: "PATCH",
        url: `/v1/reviews/${randomProductId}`,
        accept: "application/json",
        payload: requestReviewPatch,
        headers
      });
      expect(responseDelete.statusCode).toBe(200);
    });

    it("should return error when product does not exist exist", async () => {
      const randomProductId = randomstring.generate(5);
      const responseDelete = await fastify.inject({
        method: "DELETE",
        url: `/v1/reviews/${randomProductId}`,
        accept: "application/json",
        headers
      });
      expect(responseDelete.statusCode).toBe(404);
    });
  });
});
