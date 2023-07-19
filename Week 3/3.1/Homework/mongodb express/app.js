const express = require("express");
const app = express();
const port = 3000;

// Middleware untuk parsing body pada request POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Impor fungsi connectToDatabase dari db.js
const { connectToDatabase } = require("./utils/db");

// Impor routers untuk setiap bagian
const songRoutes = require("./routes/songRoutes");
const artistRoutes = require("./routes/artistRoutes");
const popularSongRoutes = require("./routes/popularSongRoutes");

// Menggunakan routers untuk setiap bagian
app.use("/song", songRoutes);
app.use("/artist", artistRoutes);
app.use("/popular", popularSongRoutes);

// Endpoint root untuk menampilkan informasi tentang aplikasi
app.get("/", (req, res) => {
  res.send({
    "MongoDB Music-App": "Homework 3.1",
    "/song": "Melihat semua data lagu yang ada di database MongoDB",
    "/song/add": "Menambahkan lagu berdasarkan data yang ada pada songsData.js",
    "/song/delete": "Menghapus semua data lagu",
    "/artist": "Melihat semua data artist yang ada di database MongoDB",
    "/artist/add":
      "Menambahkan artist berdasarkan data yang ada pada artistsData.js",
    "/artist/delete": "Menghapus semua data artist",
    "/popular": "Melihat semua data popular song yang ada di database MongoDB",
    "/popular/add":
      "Menambahkan popular song berdasarkan data yang ada pada popularSongsData.js",
    "/popular/delete": "Menghapus semua data popular song",
  });
});

// Jalankan server pada port 3000
app.listen(port, () => {
  console.log(`MongoDB Music-App || Listening at http://localhost:${port}`);
});

module.exports = {
  connectToDatabase,
};
