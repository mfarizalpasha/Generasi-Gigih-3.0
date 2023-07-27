const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.get("/", commentController.getCommentList);
router.get("/:videoID", commentController.getCommentDetailByVideo);
router.post("/", commentController.submitComment);
router.put("/:commentID", commentController.updateComment);
router.delete("/:commentID", commentController.deleteComment);

module.exports = router;
