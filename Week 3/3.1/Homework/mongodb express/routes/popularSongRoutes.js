const express = require("express");
const router = express.Router();
const popularSongsData = require("../data/popularSongsData");

const { connectToDatabase } = require("../utils/db");

// Mengambil data popular song dari database dan mengembalikan sebagai response JSON
router.get("/", async (req, res) => {
  const db = await connectToDatabase();
  if (!db) {
    res.status(500).json({ error: "Failed to connect to the database" });
    return;
  }

  try {
    const popularSongsCollection = db.collection("PopularSongs");
    const popularSongs = await popularSongsCollection.find({}).toArray();
    res.json(popularSongs);
  } catch (error) {
    console.error("Error retrieving popular songs:", error);
    res.status(500).json({ error: "Failed to retrieve popular songs" });
  }
});

// Menambahkan data popular song ke database
router.get("/add", async (req, res) => {
  const db = await connectToDatabase();
  if (!db) {
    res.status(500).json({ error: "Failed to connect to the database" });
    return;
  }

  try {
    // Mengambil referensi ke koleksi PopularSongs
    const popularSongsCollection = db.collection("PopularSongs");

    // Menambahkan data ke koleksi PopularSongs
    const insertPopularSongsResult = await popularSongsCollection.insertMany(
      popularSongsData
    );

    res.status(201).json({
      message: "Popular Song added successfully",
      popularSong: insertPopularSongsResult,
    });
  } catch (error) {
    console.error("Error adding popular song:", error);
    res.status(500).json({ error: "Failed to add popular song" });
  }
});

// Menghapus semua data popular song yang ada di database
router.get("/delete", async (req, res) => {
  const db = await connectToDatabase();
  if (!db) {
    res.status(500).json({ error: "Failed to connect to the database" });
    return;
  }

  try {
    // Mengambil referensi ke koleksi PopularSongs
    const popularSongsCollection = db.collection("PopularSongs");

    // Menghapus semua data popular song dari koleksi PopularSongs
    const deletePopularSongsResult = await popularSongsCollection.deleteMany();

    res.status(200).json({
      message: "Popular Song remove successfully",
      popularSong: deletePopularSongsResult,
    });
  } catch (error) {
    console.error("Error delete popular song:", error);
    res.status(500).json({ error: "Failed to remove popular song" });
  }
});

module.exports = router;
