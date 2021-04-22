const {
  getReviewByProductId,
  saveReviews,
  updateReviewById,
  deleteReviewById,
  patchReviewById
} = require("../review");
const mocks = require("../mocks/review");

const knexDefault = {
  knex() {
    return this;
  },
  where() {
    return this;
  },
  whereNot() {
    return this;
  },
  whereIn() {
    return this;
  },
  count() {
    return this;
  },
  returning() {
    return this;
  },
  insert() {
    return this;
  },
  as() {
    return this;
  },
  from() {
    return this;
  },
  orderBy() {
    return this;
  },
  paginate() {
    return this;
  },
  select() {
    return this;
  },
  update() {
    return this;
  }
};

describe("REVIEW Repo", () => {
  test.only("getReviewByProductId should give desired response", async () => {
    const knex = { ...knexDefault };
    knex.returning = jest.fn().mockResolvedValueOnce(mocks.review);

    const response = await getReviewByProductId.call(knex, {
      productId: "123"
    });
    expect(response).toEqual(mocks.review);
  });

  test.only("getReviewByProductId should return not found error", async () => {
    const knex = { ...knexDefault };
    /*  knex.returning = () => knexDefault;
    knex.where = jest
      .fn()
      .mockReturnValueOnce(knexDefault)
      .mockReturnValueOnce([]); */

    knex.returning = jest.fn().mockResolvedValueOnce([]);

    try {
      await getReviewByProductId.call(knex, {
        productId: "123"
      });
    } catch (err) {
      // eslint-disable-next-line no-underscore-dangle
      expect(err._code).toEqual(404);
    }
  });

  test.only("saveReview should give desired response", async () => {
    const review = mocks.reviewSave;
    const knex = { ...knexDefault };
    knex.where = () => [{ count: 0 }];
    knex.insert = () => review;
    const response = await saveReviews.call(knex, review);
    expect(response).toEqual(review);
  });

  test.only("saveReview should give error", async () => {
    const review = mocks.reviewSave;
    const knex = { ...knexDefault };
    knex.where = () => [{ count: 1 }];
    knex.insert = () => review;
    try {
      await saveReviews.call(knex, review);
    } catch (err) {
      // eslint-disable-next-line no-underscore-dangle
      expect(err._code).toEqual(400);
      // eslint-disable-next-line no-underscore-dangle
      expect(err._errors).toEqual([
        { message: "value for 'key' already exists", property: "productId" }
      ]);
    }
  });

  test.only("updateReviewById should give desired response by updating values", async () => {
    const { reviewUpdate } = mocks;
    console.log("Update request", reviewUpdate);
    const knex = { ...knexDefault };
    /* knex.where = jest
      .fn()
      .mockReturnValueOnce(knex)
      .mockReturnValueOnce([{ id: 123 }]); */
    knex.where = () => [{ length: 1 }];
    knex.returning = () => reviewUpdate;
    knex.update = this;
    knex.knex.raw = () => [];
    const response = await updateReviewById.call(knex, {
      review: reviewUpdate
    });
    expect(response).toEqual({ statusCode: 200, response: reviewUpdate });
  });

  test.only("updateReviewById should give desired response by creating values", async () => {
    const { reviewUpdate } = mocks;
    console.log("Insert request", reviewUpdate);
    const knex = { ...knexDefault };
    /* knex.where = jest
      .fn()
      .mockReturnValueOnce(knex)
      .mockReturnValueOnce([{ id: 123 }]); */
    knex.where = () => [];
    knex.insert = () => reviewUpdate;
    knex.knex.raw = () => [];
    const response = await updateReviewById.call(knex, {
      review: reviewUpdate
    });
    expect(response).toEqual({ statusCode: 201, response: reviewUpdate });
  });

  test.only("deleteReviewById should give desired response by deleting values", async () => {
    const knex = { ...knexDefault };
    knex.where = () => [{ count: 1 }];

    // knex.del = jest.fn().mockReturnValue(1);
    knex.del = jest.fn().mockResolvedValueOnce();
    knex.knex.raw = () => [];
    const response = await deleteReviewById.call(knex, {
      productId: 123
    });
    expect(response).toEqual({ data: { success: true } });
  });

  test.only("deleteReviewById should give desired response by returning error", async () => {
    const knex = { ...knexDefault };
    knex.where = () => [{ count: 0 }];

    // knex.del = jest.fn().mockReturnValue(1);
    knex.del = jest.fn().mockResolvedValueOnce();
    knex.knex.raw = () => [];

    try {
      await deleteReviewById.call(knex, {
        productId: 123
      });
    } catch (err) {
      // eslint-disable-next-line no-underscore-dangle
      expect(err._code).toEqual(400);
    }
  });

  test.only("patchReviewById should give desired response by updating values", async () => {
    const { reviewUpdate } = mocks;
    const knex = { ...knexDefault };
    knex.returning = () => [];
    knex.update = jest.fn().mockReturnValue(1);
    knex.knex.raw = () => [];

    try {
      await patchReviewById.call(knex, {
        productId: 123,
        review: reviewUpdate
      });
    } catch (err) {
      // eslint-disable-next-line no-underscore-dangle
      expect(err._code).toEqual(400);
    }
  });
});
