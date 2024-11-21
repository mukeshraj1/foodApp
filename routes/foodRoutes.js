const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createfoodController,
  getAllFood,
  getFoodById,
  GetFoodByRestaurantId,
  UpdateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//Router object
const router = express.Router();

//Routes
//Create Food
router.post("/create", authMiddleware, createfoodController);

//Get All Food
router.get("/getAll", getAllFood);

//Get Food By Id
router.get("/get/:id", getFoodById);

//Get Food By Restuarant
router.get("/getByRestaurant/:id", GetFoodByRestaurantId);

//Update By Id
router.put("/update/:id", authMiddleware, UpdateFoodController);

//Delete By Id
router.delete("/delete/:id", authMiddleware, deleteFoodController);

//Place Order
router.post("/placeOrder", authMiddleware, placeOrderController);

//Order Status
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);

module.exports = router;
