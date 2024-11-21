const FoodModel = require("../models/FoodModel");
const orderModel = require("../models/orderModel");
const userModels = require("../models/userModels");

//Create Food
const createfoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    if (!title || !description || !price || !restaurant) {
      return res.status(400).send({
        success: false,
        message: "Please provide All Fields",
      });
    }
    //Create food
    const food = new FoodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    await food.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created Successfully ",
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Food Create API ",
    });
  }
};

//Get All Food
const getAllFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No Food Available",
      });
    }
    res.status(201).send({
      success: true,
      totalcount: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in get all Food API",
      error: error.message,
    });
  }
};

//Get Food By Id
const getFoodById = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Food Id",
      });
    }
    const food = await FoodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this Id",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in get food by id API",
      error: error.message,
    });
  }
};

//Get Food By Restauarant
const GetFoodByRestaurantId = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Food Id",
      });
    }
    const food = await FoodModel.find({ restaurant: restaurantId });

    if (food.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this Id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food Based On Restaurant",
      totalcount: food.length,
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in get food by id API",
      error: error.message,
    });
  }
};

//Update Food By Id
const UpdateFoodController = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    const updatedFood = await FoodModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
        ratingCount,
      },
      { new: true }
    );
    if (!updatedFood) {
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food Updated Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Update Food API",
      error: error.message,
    });
  }
};

//Delete By Id
const deleteFoodController = async (req, res) => {
  try {
    const id = req.params.id;
    const food = await FoodModel.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "The food has been deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Delete Food API",
      error: error.message,
    });
  }
};

const placeOrderController = async (req, res) => {
  try {
    const { cart, id } = req.body;

    if (!cart || !id) {
      return res.status(400).send({
        success: false,
        message: "Please provide cart",
      });
    }

    const user = await userModels.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const userAddress = user.address;

    if (!userAddress) {
      return res.status(400).send({
        success: false,
        message: "User address not found",
      });
    }

    let total = 0;
    cart.forEach((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payments: total,
      buyer: id,
      address: userAddress,
    });

    await newOrder.save();
    res.status(200).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in place order API",
      error: error.message,
    });
  }
};

//Order Status
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        sucess: false,
        message: "Please Provide Valid Order Id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Order Status Updated",
      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In order status API",
      error: error.message,
    });
  }
};

module.exports = {
  createfoodController,
  getAllFood,
  getFoodById,
  GetFoodByRestaurantId,
  UpdateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
