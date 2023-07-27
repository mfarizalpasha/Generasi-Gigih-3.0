// app.js
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./utils/db");
const videoRoutes = require("./routes/videoRoutes");
const productRoutes = require("./routes/productRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/videos", videoRoutes);
app.use("/products", productRoutes);
app.use("/comments", commentRoutes);

// Connect to MongoDB
connectDB().then(() => {
  // Start the server
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
});
