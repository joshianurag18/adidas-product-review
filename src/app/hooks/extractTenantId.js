const jwtDecode = require("jwt-decode");
const HttpStatus = require("http-status-codes");
const { DOMAIN_LINK } = require("../commons/constants");
const { CustomError } = require("../errorHandler");

const getTenantIdFromJwt = async request => {
  try {
    const authToken = request.headers.authorization;
    const decodedToken = jwtDecode(authToken);
    return decodedToken[DOMAIN_LINK].tenant_id;
  } catch (err) {
    request.log.error("Error in fetching tenant-id from Token");
    request.log.error(err.message);
    throw CustomError.create(
      HttpStatus.UNAUTHORIZED,
      err.message,
      "authorization",
      "INVALID_AUTH_TOKEN"
    );
  }
};

// eslint-disable-next-line no-unused-vars
module.exports = async (request, reply) => {
  const tenantId = await getTenantIdFromJwt(request, reply);
  if (!tenantId) {
    request.log.error("Error in fetching tenant-id from Token");
    throw CustomError.create(
      HttpStatus.UNAUTHORIZED,
      "Error in fetching tenant-id from Token",
      "authorization",
      "INVALID_AUTH_TOKEN"
    );
  }
  request.tenantId = tenantId;
};
