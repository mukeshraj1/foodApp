const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/getUser", authMiddleware, getUserController);
router.put("/updateUser/:id", authMiddleware, updateUserController);
router.post("/updatePassword", authMiddleware, updatePasswordController);
router.post("/resetPassword", authMiddleware, resetPasswordController);
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

module.exports = router;
