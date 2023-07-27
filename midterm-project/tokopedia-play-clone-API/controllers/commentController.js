const { Comment, Video } = require("../models");

exports.getCommentList = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCommentDetailByVideo = async (req, res) => {
  try {
    const videoID = req.params.videoID;
    const comments = await Comment.find({ videoID });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.submitComment = async (req, res) => {
  try {
    const { username, comment, videoID } = req.body;

    if (!username || !comment || !videoID) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingVideo = await Video.findOne({ videoID });

    if (!existingVideo) {
      return res
        .status(404)
        .json({ error: "Video not found for the given videoID" });
    }

    const newComment = new Comment({ username, comment, videoID });
    await newComment.save();
    res.json({ success: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const commentID = req.params.commentID;
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentID,
      { comment },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ success: "success to update comment" });
  } catch (error) {
    res.status(500).json({ error: "fail to update comment" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentID = req.params.commentID;

    const deletedComment = await Comment.findByIdAndRemove(commentID);

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ success: "success to delete comment" });
  } catch (error) {
    res.status(500).json({ error: "fail to delete comment" });
  }
};
