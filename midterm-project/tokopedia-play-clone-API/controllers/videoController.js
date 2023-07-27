const { Video } = require("../models");

exports.getVideoList = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getVideoDetail = async (req, res) => {
  try {
    const videoID = req.params.videoID;
    const video = await Video.findOne({ videoID: videoID });

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addVideo = async (req, res) => {
  try {
    const { thumbnailUrl, videoID } = req.body;
    if (!thumbnailUrl || !videoID) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingVideo = await Video.findOne({ videoID });

    if (existingVideo) {
      return res.status(409).json({ error: "Video already exists" });
    }

    const newVideo = new Video({ thumbnailUrl, videoID });
    await newVideo.save();
    res.json({ success: "success to add video" });
  } catch (error) {
    res.status(500).json({ error: "fail to add video" });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const videoID = req.params.videoID;
    const { thumbnailUrl } = req.body;
    if (!thumbnailUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const video = await Video.findOne({ videoID });
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    video.thumbnailUrl = thumbnailUrl;
    await video.save();

    res.json({ success: "success to update video" });
  } catch (error) {
    res.status(500).json({ error: "fail to update video" });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const videoID = req.params.videoID;

    const video = await Video.findOne({ videoID });
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    await video.deleteOne();

    res.json({ success: "success to delete video" });
  } catch (error) {
    res.status(500).json({ error: "fail to delete video" });
  }
};
