const express = require("express");
const router = express.Router();
const songsData = require("../data/songsData");

const { connectToDatabase } = require("../utils/db");

// Mengambil data lagu dari database dan mengembalikan sebagai response JSON
router.get("/", async (req, res) => {
  const db = await connectToDatabase();
  if (!db) {
    res.status(500).json({ error: "Failed to connect to the database" });
    return;
  }

  try {
    const songsCollection = db.collection("Songs");
    const songs = await songsCollection.find({}).toArray();
    res.json(songs);
  } catch (error) {
    console.error("Error retrieving songs:", error);
    res.status(500).json({ error: "Failed to retrieve songs" });
  }
});

// Menambahkan data lagu ke database
router.get("/add", async (req, res) => {
  const db = await connectToDatabase();
  if (!db) {
    res.status(500).json({ error: "Failed to connect to the database" });
    return;
  }

  try {
    // Mengambil referensi ke koleksi Songs
    const songsCollection = db.collection("Songs");

    // Menambahkan data ke koleksi Songs
    const insertSongsResult = await songsCollection.insertMany(songsData);

    res
      .status(201)
      .json({ message: "Song added successfully", song: insertSongsResult });
  } catch (error) {
    console.error("Error adding song:", error);
    res.status(500).json({ error: "Failed to add song" });
  }
});

// Menghapus semua data lagu yang ada di database
router.get("/delete", async (req, res) => {
  const db = await connectToDatabase();
  if (!db) {
    res.status(500).json({ error: "Failed to connect to the database" });
    return;
  }

  try {
    // Mengambil referensi ke koleksi Songs
    const songsCollection = db.collection("Songs");

    // Menghapus semua data lagu dari koleksi Songs
    const deleteSongsResult = await songsCollection.deleteMany();

    res.status(200).json({
      message: "Song remove successfully",
      song: deleteSongsResult,
    });
  } catch (error) {
    console.error("Error delete song:", error);
    res.status(500).json({ error: "Failed to remove song" });
  }
});

module.exports = router;
