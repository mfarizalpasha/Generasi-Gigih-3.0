const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoID: String,
  thumbnailUrl: String,
});

module.exports = mongoose.model("Video", videoSchema);
