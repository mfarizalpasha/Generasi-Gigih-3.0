// models/product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productID: String,
  link: String,
  title: String,
  price: Number,
  videoID: {
    type: String,
    ref: "VideoModel",
  },
});

module.exports = mongoose.model("Product", productSchema);
