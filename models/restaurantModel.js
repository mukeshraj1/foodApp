const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/cf/59/60/kfc-jaux.jpg?w=1000&h=-1&s=1",
    },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
      default:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/cf/59/60/kfc-jaux.jpg?w=1000&h=-1&s=1",
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    code: {
      type: String,
    },
    address: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
