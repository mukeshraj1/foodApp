const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized user",
          error: error.message,
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Please provide auth token",
      error: error.message,
    });
  }
};
module.exports = authMiddleware;
