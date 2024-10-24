const express = require("express");
const {
  createRestaurantController,
  updateRestaurantController,
  getAllRestaurant,
  getRestaurantById,
  deleteRestaurantController,
} = require("../controllers/restaurantController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Route for creating a new restaurant
router.post("/createRestaurant", authMiddleware, createRestaurantController);

// Route for getting all restaurants
router.get("/getAll", getAllRestaurant);

// Route for getting a restaurant by ID
router.get("/get/:id", getRestaurantById);

// Route for deleting a restaurant
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

// Route for Updating a restaurant
router.put("/update/:id", authMiddleware, updateRestaurantController);

module.exports = router;
