const userModels = require("../models/userModels");

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const user = await userModels.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    console.log(user.userType);
    if (user.userType !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Access",
      });
    }

    // User is admin, proceed to the next middleware
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unauthorized Access",
      error: error.message,
    });
  }
};

module.exports = adminMiddleware;
