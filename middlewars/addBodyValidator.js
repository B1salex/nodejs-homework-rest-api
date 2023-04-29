const { HttpError } = require("../helpers/HttpError");
const objectFieldsChecker = require("../helpers/objectFieldsChecker");
const addBodyValidator = (schema) => {
  const valid = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const alertMessage = objectFieldsChecker(req.body);
      next(HttpError(400, alertMessage));
    }
    next();
  };
  return valid;
};

module.exports = addBodyValidator;
