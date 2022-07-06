const jwt = require("jsonwebtoken");

const constants = require("../configs/constants");

const responseCode = require("../configs/responseCode");

const { ERROR_UNAUTHORIZED } = responseCode;

const auth = (req, res, next) => {
  try {
    if (!req.headers)
      return res.status(ERROR_UNAUTHORIZED).send({
        code: ERROR_UNAUTHORIZED,
        message: "No headers provided.",
      });

    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;

    jwt.verify(token, constants.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(ERROR_UNAUTHORIZED).send({
          code: ERROR_UNAUTHORIZED,
          message: "Failed to authenticate token.",
        });
      }
      const { userId, userName, garageName, email, status } = decoded;
      console.log(
        "userId, status, imageUrl, userName => ",
        userId,
        userName,
        garageName,
        email,
        status
      );
      req.session = {
        userId,
        userName,
        garageName,
        email,
        status,
      };
      console.log("correct!!!!!!! token");
      next();
    });
  } catch (err) {
    return res.status(ERROR_UNAUTHORIZED).send({
        code: ERROR_UNAUTHORIZED,
        message: 'Failed to authenticate token.'
      })
  }

};

module.exports = auth;
