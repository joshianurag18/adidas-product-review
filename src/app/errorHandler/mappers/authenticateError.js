const CustomError = require("../CustomError");

module.exports = error => {

  var message = error.message;

  if (message.includes("Authorization")) {

    return new CustomError(401, error);

  };
}