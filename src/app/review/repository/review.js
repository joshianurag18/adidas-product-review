const HttpStatus = require("http-status-codes");
const { CustomError } = require("../../errorHandler");
const {
  KEY_ALREADY_EXIST,
  KEY_DOES_NOT_EXIST
} = require("../../commons/constants");

exports.saveReviews = async function saveReviews({ review }) {
  console.log("-----Repository------------");
  console.log(review);
  const productId = review.product_id;
  const keyCount = await this.knex("product_review")
    .count("product_id")
    .where("product_id", productId);
  if (keyCount[0].count > 0)
    throw CustomError.create(
      HttpStatus.BAD_REQUEST,
      KEY_ALREADY_EXIST,
      "productId"
    );
  const response = this.knex("product_review").returning("*").insert(review);
  console.log("*********");
  console.log(response);
  return response;
};

exports.updateReviewById = async function updateReviewById({ review }) {
  console.log("Update-----", review);
  const key = await this.knex("product_review")
    .select("product_id")
    .where("product_id", review.product_id);
  if (key.length > 0) {
    console.log("******Update");
    const response = await this.knex("product_review")
      .where("product_id", review.product_id)
      .update({
        ...review
      })
      .returning("*");
    return { statusCode: 200, response };
  }
  const response = await this.knex("product_review")
    .returning("*")
    .insert(review);
  return { statusCode: 201, response };
};

exports.patchReviewById = async function patchReviewById({
  productId,
  review
}) {
  console.log("Patch.........", productId, review);

  const query = this.knex("product_review")
    .where("product_id", productId)
    .returning("*");

  const response = await query;
  if (!response.length) {
    console.log("Patch Error.........");
    throw CustomError.create(
      HttpStatus.NOT_FOUND,
      KEY_DOES_NOT_EXIST,
      "productId"
    );
  }

  const responseUpdate = this.knex("product_review")
    .where("product_id", productId)
    .update({
      ...review
    })
    .returning("*");
  return responseUpdate;
};

exports.getReviewByProductId = async function getReviewByProductId({
  productId
}) {
  const query = this.knex("product_review")
    .where("product_id", productId)
    .returning("*");

  const response = await query;
  if (!response.length) {
    throw new CustomError(HttpStatus.NOT_FOUND,HttpStatus.BAD_REQUEST);
  }
  return response;
};

exports.deleteReviewById = async function deleteReviewById({ productId }) {
  console.log("------Repo Delete------");
  console.log(productId);
  const keyCount = await this.knex("product_review")
    .count("product_id")
    .where("product_id", productId);
  if (keyCount[0].count > 0)
    await this.knex("product_review").where("product_id", productId).del();
  else {
    throw CustomError.create(
      HttpStatus.NOT_FOUND,
      KEY_DOES_NOT_EXIST,
      "productId"
    );
  }
  return { data: { success: true } };
};
