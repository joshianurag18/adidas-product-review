"use-strict";

const fp = require("fastify-plugin");
const Ajv = require("ajv");
const AjvKeywords = require("ajv-keywords");
const AjvErrors = require("ajv-errors");
const { CUSTOM_AJV_VALIDATION_ERROR } = require("../../commons/constants");

const defaultAjvSettngs = {
  allErrors: true,
  jsonPointers: true,
  removeAdditional: false,
  useDefaults: true,
  coerceTypes: true,
  nullable: true
};
const defaultKeywords = ["transform", "uniqueItemProperties"];

const validateSchema = ajv => (
  schema,
  data,
  errorType = CUSTOM_AJV_VALIDATION_ERROR
) => {
  if (!ajv.validate(schema, data)) {
    const err = new Error();
    err.type = errorType;
    err.errors = ajv.errors;
    throw err;
  }
};

async function ajvPlugin(
  fastify,
  { settings = defaultAjvSettngs, keywords = defaultKeywords }
) {
  try {
    const ajv = new Ajv(settings);
    AjvKeywords(ajv, keywords);
    AjvErrors(ajv);
    fastify.decorate("validateSchema", validateSchema(ajv));
    fastify.setSchemaCompiler(schema => ajv.compile(schema));
  } catch (err) {
    fastify.log.error(err, err.message);
    fastify.log.error("AJV compilation failed");
    throw Error(`AJV compilation failed ${err}`);
  }
}
