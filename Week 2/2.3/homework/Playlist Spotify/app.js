const express = require("express");
const Playlist = require("./models/playlist");
const app = express();
const PORT = 3000;

let playlist = [
  new Playlist(1, "Song A", 2),
  new Playlist(2, "Song B", 5),
  new Playlist(3, "Song C", 1),
];

// Middleware for parsing JSON bodies
app.use(express.json());

// Get songs sorted by most played
app.get("/playlist/most-played", (req, res) => {
  const sortedPlaylist = playlist.sort((a, b) => b.playCount - a.playCount);
  res.json(sortedPlaylist);
});

// Track song play count in the playlist
app.get("/playlist/:id", (req, res) => {
  const { id } = req.params;
  const song = playlist.find((item) => item.id === parseInt(id));

  if (song) {
    res.json({
      message: ` ${song.title} has Play Count : ${song.playCount}`,
    });
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});

// Added 1 playcount to song
app.get("/playlist/:id/play", (req, res) => {
  const { id } = req.params;
  const song = playlist.find((item) => item.id === parseInt(id));

  if (song) {
    song.increasePlayCount();
    res.json({ message: `Now playing: ${song.title}` });
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});

// Add a new song to the playlist
app.post("/playlist", (req, res) => {
  let lastId = playlist.length;
  let { title } = req.body;

  if (!title) {
    res.status(400).json({ message: "Title is required" });
  } else {
    let newId = lastId + 1;
    let existingSong = playlist.find((item) => item.id === newId);

    while (existingSong) {
      newId++;
      existingSong = playlist.find((item) => item.id === newId);
    }

    const newSong = new Playlist(newId, title);
    playlist.push(newSong);
    lastId = newId;

    res.json({ message: "Song added successfully", id: newId });
  }
});

// Get all songs in the playlist
app.get("/playlist", (req, res) => {
  const allSongs = playlist.map((song) => {
    const { id, title, playCount } = song;
    return { id, title, playCount };
  });

  res.json(allSongs);
});

// Update play count of a song
app.put("/playlist/:id/playcount", (req, res) => {
  const { id } = req.params;
  const { playCount } = req.body;
  const songIndex = playlist.findIndex((item) => item.id === parseInt(id));

  if (songIndex !== -1) {
    playlist[songIndex].playCount = playCount;
    res.json({ message: "Play count updated successfully" });
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});

// delete data by id
app.delete("/playlist/:id", (req, res) => {
  const { id } = req.params;
  const songIndex = playlist.findIndex((item) => item.id === parseInt(id));

  if (songIndex !== -1) {
    playlist.splice(songIndex, 1);
    res.json({ message: "Song deleted successfully" });
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
