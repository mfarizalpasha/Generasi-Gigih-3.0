const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

router.get("/", videoController.getVideoList);
router.get("/:videoID", videoController.getVideoDetail);
router.post("/", videoController.addVideo);
router.put("/:videoID", videoController.updateVideo);
router.delete("/:videoID", videoController.deleteVideo);

module.exports = router;
