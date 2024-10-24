const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  getCategoryById,
  getAllCategory,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/categoryController");

//Router Object
const router = express.Router();

//Routes
//Create Category
router.post("/create", authMiddleware, createCategoryController);

//Get All Category
router.get("/getAll", getAllCategory);

//Get Category By Id
router.get("/get/:id", getCategoryById);

//Update Category By Id
router.put("/update/:id", authMiddleware, updateCategoryById);

//Delete Category By Id
router.delete("/delete/:id", authMiddleware, deleteCategoryById);

module.exports = router;
