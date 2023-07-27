const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: String,
  comment: String,
  timestamp: { type: Date, default: Date.now },
  videoID: {
    type: String,
    ref: "VideoModel",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
