const userModels = require("../models/userModels");
const bcrypt = require("bcrypt");

const getUserController = async (req, res) => {
  try {
    const user = await userModels.findById(req.body.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User data retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const { userName, email, phone, address, userType } = req.body;
    const user = await userModels.findByIdAndUpdate(
      userId,
      { userName, email, phone, address, userType },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error,
    });
  }
};

//Update User Password

const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModels.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: true,
        message: "Please provide old or new password",
      });
    }
    //Check user password | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }

    //Hashing Password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(201).send({
      success: true,
      message: "password Updated",
    });
  } catch (error) {
    res.status(500).send({
      success: true,
      message: "Error in Update User Password API",
      error: error.message,
    });
  }
};

//Reset Password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const user = await userModels.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found or invalid answer",
      });
    }
    //Hashing Password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(201).send({
      success: true,
      message: "password Reset Successfully",
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "Error in reset password API ",
      error: error.message,
    });
  }
};

//Delete User
const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModels.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete User API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
};
