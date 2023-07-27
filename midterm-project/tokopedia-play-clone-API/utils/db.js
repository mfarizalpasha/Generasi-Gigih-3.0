// utils/db.js
const mongoose = require("mongoose");
const config = require("../config");

// Fungsi untuk menghubungkan ke database MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Keluar dari aplikasi jika gagal terhubung ke database
  }
};

module.exports = connectDB;
