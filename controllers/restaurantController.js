const restaurantModel = require("../models/restaurantModel");

// Create Restaurant
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      address,
    } = req.body;
    if (!title || !address) {
      return res.status(400).send({
        success: false,
        message: "Please provide Address",
      });
    }

    // Create New Restaurant
    const restaurant = new restaurantModel({
      title,
      imageUrl,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      address,
    });
    await restaurant.save();

    res.status(201).send({
      success: true,
      message: "New restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in restaurant create API",
      error: error.message,
    });
  }
};

// Get All Restaurants
const getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants.length) {
      return res.status(404).send({
        success: false,
        message: "No restaurants available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting all restaurants",
      error: error.message,
    });
  }
};

// Get Restaurant by ID
const getRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Provide restaurant ID",
      });
    }
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting restaurant by ID",
      error: error.message,
    });
  }
};

// Delete Restaurant
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await restaurantModel.findByIdAndDelete(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant has been deleted successfully",
    });
  } catch (error) {
    console.error(error); 
    res.status(500).send({
      success: false,
      message: "Error in deleting restaurant",
      error: error.message,
    });
  }
};

// Update Restaurant Details
const updateRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const { title, address, time, pickup, delivery } = req.body;
    if (!title || !address || !time) {
      return res.status(400).send({
        success: false,
        message: "Please provide title, address, and time",
      });
    }

    // Find the restaurant by ID and update details
    const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
      restaurantId,
      {
        title,
        address,
        time,
        pickup,
        delivery,
      },
      { new: true } 
    );

    // Check if the restaurant was found and updated
    if (!updatedRestaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant details updated successfully",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in updating restaurant details",
      error: error.message,
    });
  }
};

module.exports = {
  createRestaurantController,
  updateRestaurantController,
  getAllRestaurant,
  getRestaurantById,
  deleteRestaurantController,
};
