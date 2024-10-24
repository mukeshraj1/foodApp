const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModels = require("../models/userModels");

//Get User
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, userType, answer } =
      req.body;
    if (!userName || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "Provide all fields",
      });
    }
    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Email already registered, please Login",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModels.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      userType,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occurred, please try again later.",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Provide email and password",
      });
    }
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7 days",
    });
    user.password = undefined;
    res.cookie("token", token);
    res.status(201).send({
      success: true,
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
