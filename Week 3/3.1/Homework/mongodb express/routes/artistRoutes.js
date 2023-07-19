const express = require("express");
const router = express.Router();
const artistsData = require("../data/artistsData");

const { connectToDatabase } = require("../utils/db");

// Mengambil data artist dari database dan mengembalikan sebagai response JSON
router.get("/", async (req, res) => {
  const db = await connectToDatabase();
  if (!db) {
    res.status(500).json({ error: "Failed to connect to the database" });
    return;
  }

  try {
    const artistCollection = db.collection("Artists");
    const artists = await artistCollection.find({}).toArray();
    res.json(artists);
  } catch (error) {
    console.error("Error retrieving artists:", error);
    res.status(500).json({ error: "Failed to retrieve artists" });
  }
});

// Menambahkan data artist ke database
router.get("/add", async (req, res) => {
  const db = await connectToDatabase();
  if (!db) {
    res.status(500).json({ error: "Failed to connect to the database" });
    return;
  }

  try {
    // Mengambil referensi ke koleksi Artists
    const artistCollection = db.collection("Artists");

    // Menambahkan data ke koleksi Artists
    const insertArtistsResult = await artistCollection.insertMany(artistsData);

    res.status(201).json({
      message: "Artist added successfully",
      artist: insertArtistsResult,
    });
  } catch (error) {
    console.error("Error adding artist:", error);
    res.status(500).json({ error: "Failed to add artist" });
  }
});

// Menghapus semua data artist yang ada di database
router.get("/delete", async (req, res) => {
  const db = await connectToDatabase();
  if (!db) {
    res.status(500).json({ error: "Failed to connect to the database" });
    return;
  }

  try {
    // Mengambil referensi ke koleksi Artists
    const artistCollection = db.collection("Artists");

    // Menghapus semua data artist dari koleksi Artists
    const deleteArtistsResult = await artistCollection.deleteMany();

    res.status(200).json({
      message: "Artist remove successfully",
      artist: deleteArtistsResult,
    });
  } catch (error) {
    console.error("Error delete artist:", error);
    res.status(500).json({ error: "Failed to remove artist" });
  }
});

module.exports = router;
