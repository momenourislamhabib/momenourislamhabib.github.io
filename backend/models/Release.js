const { v4: uuidv4 } = require('uuid');

class Release {
  constructor(artistId, title, genre, releaseDate) {
    this.id = uuidv4();
    this.artistId = artistId;
    this.title = title;
    this.genre = genre;
    this.releaseDate = releaseDate;
    this.tracks = [];
    this.platforms = [];
    this.status = 'draft'; // draft, submitted, distributed
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  addTrack(track) {
    this.tracks.push({
      id: uuidv4(),
      title: track.title,
      duration: track.duration,
      fileUrl: track.fileUrl,
      trackNumber: track.trackNumber || this.tracks.length + 1
    });
    this.updatedAt = new Date().toISOString();
  }

  addPlatform(platform) {
    if (!this.platforms.includes(platform)) {
      this.platforms.push(platform);
      this.updatedAt = new Date().toISOString();
    }
  }

  updateStatus(status) {
    const validStatuses = ['draft', 'submitted', 'distributed'];
    if (validStatuses.includes(status)) {
      this.status = status;
      this.updatedAt = new Date().toISOString();
    }
  }

  update(updates) {
    if (updates.title) this.title = updates.title;
    if (updates.genre) this.genre = updates.genre;
    if (updates.releaseDate) this.releaseDate = updates.releaseDate;
    if (updates.status) this.updateStatus(updates.status);
    this.updatedAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      artistId: this.artistId,
      title: this.title,
      genre: this.genre,
      releaseDate: this.releaseDate,
      tracks: this.tracks,
      platforms: this.platforms,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Release;
