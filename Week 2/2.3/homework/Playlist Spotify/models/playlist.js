class Playlist {
  constructor(id, title, playCount) {
    this.id = id;
    this.title = title;
    this.playCount = playCount;
  }

  increasePlayCount() {
    this.playCount++;
  }
}

module.exports = Playlist;
