exports.review = [
  {
    productId: "543",
    averageReviewScore: "876",
    numberOfReviwes: "1"
  }
];

exports.reviewSave = {
  review: {
    product_id: "543",
    average_review_score: "4",
    number_of_reviwes: "1"
  }
};

exports.reviewUpdate = {
  product_id: "543",
  average_review_score: "4",
  number_of_reviwes: "1"
};

exports.postReviewRequest = {
  data: {
    review: {
      productId: "123121",
      averageReviewScore: "4",
      numberOfReviwes: "1"
    }
  }
};

const harmlessTestingToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkaWRhcyIsImhlbGxvIjoiUmV2aWV3IEFwcGxpY2F0aW9uIiwiaWF0IjoxNjE4OTc2MTkwfQ.txP-snI1vdNdbTsgbfshwTPiZ6DgfOWdHU9AMxvVUMk";

const headers = { 
  authorization: harmlessTestingToken,
};

module.exports = {
  headers
};
