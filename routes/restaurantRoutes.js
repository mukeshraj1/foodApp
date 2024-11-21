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

router.post("/createRestaurant", authMiddleware, createRestaurantController);

router.get("/getAll", getAllRestaurant);

router.get("/get/:id", getRestaurantById);

router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

router.put("/update/:id", authMiddleware, updateRestaurantController);

module.exports = router;
