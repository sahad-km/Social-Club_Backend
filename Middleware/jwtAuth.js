const JWT = require("jsonwebtoken");

const validateUserToken = async (req, res, next) => {
  if (req.headers["x-custom-header"]) {
    try {
      const user = req.headers["x-custom-header"];
      const decode = JWT.verify(user, "secret123");
      const userId = decode.userId;
      if (userId) {
        next();
      }
    } catch (err) {
      return res.status(200).send({ errormsg: "authentication failed" });
    }
  } else {
    return res.status(200).send({ errormsg: "authentication failed" });
  }
};

exports.validateUserToken = validateUserToken;
