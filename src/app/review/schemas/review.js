const {
  errorSchemas
} = require("../../commons/schema");

const commonResponseSchema = {
 
   type: "object",
    required: ["reviwes"],
    properties: {
      reviwes: {
        type: "object",
        properties: {
          productId: { type: "string" },
          averageReviewScore: { type: "number" },
          numberOfReviwes: { type: "number" }
        }
      }
    }
  
};

exports.saveReviewSchema = {
  tags: ["Review"],
  summary: "This API is used to create review for given product",
  description: "Product Id should be Unique",
  //  headers: headersSchema,
  body: {
    required: ["data"],
    properties: {
      data: {
        type: "object",
        required: ["review"],
        properties: {
          review: {
            type: "object",
            required: ["productId", "averageReviewScore", "numberOfReviwes"],
            properties: {
              productId: { type: "string" },
              averageReviewScore: { type: "number" },
              numberOfReviwes: { type: "number" }
            }
          }
        }
      }
    }
  },
  response: {
    201: {
      required: ["data"],
      properties: {
        data: {
          type: "object",
          properties: {
            review: {
              type: "object",
              required: ["productId", "averageReviewScore", "numberOfReviwes"],
              properties: {
                productId: { type: "string" },
                averageReviewScore: { type: "number" },
                numberOfReviwes: { type: "number" }
              }
            }
          }
        }
      }
    },
    ...errorSchemas
  }
};

exports.getReviewSchema = {
  tags: ["Review"],
  summary: "This API returns review based on passed product",
  description: "Get reviwes based on product id",
  // headers: headersSchema,
  // params: ["productId"],
  response: {
    200: {
      required: ["data"],
      properties: {
        data: {
          type: "object",
          properties: {
            review: {
              type: "object",
              required: ["productId", "averageReviewScore", "numberOfReviwes"],
              properties: {
                productId: { type: "string" },
                averageReviewScore: { type: "number" },
                numberOfReviwes: { type: "number" }
              }
            }
          }
        }
      }
    },
    ...errorSchemas
  }
};

exports.updateReviewSchema = {
  tags: ["Review"],
  summary: "This API is used to create  Review for given product",
  description: "Product Id should be Unique",
  //  headers: headersSchema,
  body: {
    required: ["data"],
    properties: {
      data: {
        type: "object",
        required: ["review"],
        properties: {
          review: {
            type: "object",
            required: ["productId", "averageReviewScore", "numberOfReviwes"],
            properties: {
              productId: { type: "string" },
              averageReviewScore: { type: "number" },
              numberOfReviwes: { type: "number" }
            }
          }
        }
      }
    }
  },
  response: {
    201: {
      required: ["data"],
      properties: {
        data: {
          type: "object",
          properties: {
            review: {
              type: "object",
              required: ["productId", "averageReviewScore", "numberOfReviwes"],
              properties: {
                productId: { type: "string" },
                averageReviewScore: { type: "number" },
                numberOfReviwes: { type: "number" }
              }
            }
          }
        }
      }
    },
    200: {
      required: ["data"],
      properties: {
        data: {
          type: "object",
          properties: {
            review: {
              type: "object",
              required: ["productId", "averageReviewScore", "numberOfReviwes"],
              properties: {
                productId: { type: "string" },
                averageReviewScore: { type: "number" },
                numberOfReviwes: { type: "number" }
              }
            }
          }
        }
      }
    },
    ...errorSchemas
  }
};
exports.deleteReviewByIdSchema = {
  tags: ["Delete Review"],
  summary: "This API deletes review based on passed product",
  description: "Delete reviwes based on product id",
  // headers: headersSchema,
  // params: productId: { type: "string" },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            success: { type: "boolean" }
          }
        }
      }
    },
    ...errorSchemas
  }
};

exports.patchReviewSchema = {
  tags: ["Review"],
  summary: "This API is used to patch Review for given product",
  description: "Patch Review API",
  //  headers: headersSchema,
  body: {
    required: ["data"],
    properties: {
      data: {
        type: "object",
        required: ["review"],
        properties: {
          review: {
            type: "object",
            properties: {
              productId: { type: "string" },
              averageReviewScore: { type: "number" },
              numberOfReviwes: { type: "number" }
            }
          }
        }
      }
    }
  },
  response: {
    201: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            reviwes: commonResponseSchema
          }
        }
      }
    },
    ...errorSchemas
  }
};
