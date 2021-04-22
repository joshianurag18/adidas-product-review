const { create } = require("../../../../src/index");

describe("GET review Integration Test", () => {
  let fastify;

  beforeAll(async () => {
    fastify = await create();
    // await fastify.ready();
  });

  /* afterAll(() => {
    fastify.knex.destroy();
  }); */

  describe("Get review by product id", () => {
    it("should return review for product id - success case", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/v1/reviews/99",
        accept: "application/json"
      });

      expect(response.statusCode).toBe(200);
      //  expect(JSON.parse(response.payload)).toEqual(getReviewResponse);
    });

    it("should return error for product id which  does not exist- error case", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/v1/reviews/9876",
        accept: "application/json"
      });

      expect(response.statusCode).toBe(404);
      //  expect(JSON.parse(response.payload)).toEqual(getReviewResponse);
    });

    it("should return error for product id which  does not exist- error case", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/v1/reviews",
        accept: "application/json"
      });

      expect(response.statusCode).toBe(404);

      expect(JSON.parse(response.payload).message).toEqual(
        "Route GET:/v1/reviews not found"
      );
    });
  });
});
