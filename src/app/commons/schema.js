exports.envSchema = {
  type: "object",
  properties: {
    DB_USER: {
      type: "string",
      default: "postgres"
    },
    DB_PASSWORD: {
      type: "string",
      default: "postgres"
    },
    DB_NAME: {
      type: "string",
      default: "postgres"
    },
    DB_HOST: {
      type: "string",
      default: "localhost"
    },
    DB_PORT: {
      type: "string",
      default: "5432"
    },
    NODE_ENV: {
      type: "string",
      default: "dev"
    }
  }
};
const validationErrorSchema = {
  type: "object",
  properties: {
    errors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          property: { type: "string" },
          message: { type: "string" },
          code: { type: "string" }
        }
      }
    }
  }
};

const commonErrorSchema = {
  type: "object",
  properties: {
    errors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          code: { type: "string" },
          message: { type: "string" }
        }
      }
    }
  }
};

exports.headersSchema = {
  type: "object",
  required: ["Authorization"],
  properties: {
    Authorization: { type: "string" }
  }
};

exports.customInfoSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "string" },
      type: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      order: { type: "number" },
      group: { type: "string" },
      isMandatory: { type: "boolean" },
      values: {
        type: "array",
        items: {
          type: "string"
        }
      },
      metadata: {
        type: "array",
        items: { type: "object" }
      }
    }
  }
};

exports.auditSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    createdBy: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedBy: { type: "string" },
    updatedAt: { type: "string", format: "date-time" }
  }
};
exports.errorSchemas = {
  400: validationErrorSchema,
  401: commonErrorSchema,
  403: commonErrorSchema,
  404: commonErrorSchema,
  405: commonErrorSchema,
  415: commonErrorSchema,
  429: commonErrorSchema,
  500: commonErrorSchema,
  502: commonErrorSchema,
  504: commonErrorSchema
};
