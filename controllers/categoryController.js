const categoryModel = require("../models/categoryModel");

//Create Category
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(404).send({
        success: false,
        message: "please provide title",
      });
    }
    const category = new categoryModel({ title, imageUrl });
    await category.save();
    res.status(201).send({
      success: true,
      message: "Category Created Successsfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Create category API",
      error,
    });
  }
};

//Get All Category
const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No category Available",
      });
    }
    res.status(200).send({
      success: true,
      totalcount: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get Category API",
      error,
    });
  }
};

// Get Category By ID
const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category found successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching category by ID",
      error: error.message,
    });
  }
};

//Update Category By Id
const updateCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "No Category Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully ",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Updated Category API",
    });
  }
};

//Delete Category By Id
const deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      res.status(404).send({
        success: false,
        message: "Category Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "The Category Has Been Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete Category API",
      error: error.message,
    });
  }
};

module.exports = {
  createCategoryController,
  getCategoryById,
  getAllCategory,
  updateCategoryById,
  deleteCategoryById,
};
