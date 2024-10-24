const express = require("express");
const path = require("path");
const router = express.Router();

// Serve static files from the public directory
router.use(express.static(path.join(__dirname, "..", "public")));

// Serve the HTML files
router.get("/userCrud", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "UsersCrud.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "register.html"));
});

router.get("/restaurantCRUD", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "restaurantCRUD.html"));
});

// Serve the categories management HTML file
router.get("/category", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "categories.html"));
});

module.exports = router;
