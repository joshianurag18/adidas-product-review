const basic = require("./basic");
const paramsValidation = require("./paramsValidation");
const unstructuredError = require("./unstructuredError");
const postgressError = require("./postgressError");
const customAjv = require("./customAjvValidationError");
const authenticateError = require("./authenticateError");

module.exports = {
  paramsValidation,
  unstructuredError,
  postgressError,
  DEFAULT_MAPPERS: [
    basic,
    paramsValidation,
    customAjv,
    postgressError,
    unstructuredError,
    authenticateError
  ]
};
