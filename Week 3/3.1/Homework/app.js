const { MongoClient } = require("mongodb");
const songsData = require("./data/songsData");
const artistsData = require("./data/artistsData");
const popularSongsData = require("./data/popularSongsData");
const express = require("express");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`MongoDB Music-App || Listening at http://localhost:${port}`);
});

// URL koneksi MongoDB
const uri = "mongodb://127.0.0.1:27017";

// Nama database
const dbName = "music_database";

async function main() {
  // Membuat klien MongoDB
  const client = new MongoClient(uri);

  try {
    // Menghubungkan ke server MongoDB
    await client.connect();

    console.log("Connected to the MongoDB server");

    // Mengambil referensi ke database
    const db = client.db(dbName);

    // Mengambil referensi ke koleksi Songs
    const songsCollection = db.collection("Songs");

    // Menambahkan data ke koleksi Songs
    const insertSongsResult = await songsCollection.insertMany(songsData);
    console.log(`${insertSongsResult.insertedCount} songs inserted`);

    // Mengambil referensi ke koleksi Artists
    const artistsCollection = db.collection("Artists");

    // Menambahkan data ke koleksi Artists
    const insertArtistsResult = await artistsCollection.insertMany(artistsData);
    console.log(`${insertArtistsResult.insertedCount} artists inserted`);

    // Mengambil referensi ke koleksi PopularSongs
    const popularSongsCollection = db.collection("PopularSongs");

    // Menambahkan data ke koleksi PopularSongs
    const insertPopularSongsResult = await popularSongsCollection.insertMany(
      popularSongsData
    );
    console.log(
      `${insertPopularSongsResult.insertedCount} popular songs inserted`
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Menjalankan fungsi utama
main().catch(console.error);
