const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./utils/db");
const videoRoutes = require("./routes/videoRoutes");
const productRoutes = require("./routes/productRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/videos", videoRoutes);
app.use("/products", productRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
  res.json({
    API_list:
      "https://gist.github.com/mfarizalpasha/46f488af9aa27988803ae3decf917c48",
  });
});

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
});
