const ErrorHandler = require("../erros/ErrorHandler");

function apiKey(err,req, res, next) {
  const api_key = "1234564";
  const userApi = req.query;
  if (userApi && userApi.api_key === api_key) {
    next();
  } else {
    next(ErrorHandler.forbidden("Not Allowed"));
  }
}

module.exports = apiKey;
