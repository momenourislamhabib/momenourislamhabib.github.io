const Artist = require('../models/Artist');

// In-memory storage for artists (in production, use a database)
const artists = new Map();

const artistController = {
  // Get all artists
  getAllArtists: (req, res) => {
    const artistList = Array.from(artists.values()).map(artist => artist.toJSON());
    res.json({
      success: true,
      count: artistList.length,
      data: artistList
    });
  },

  // Get artist by ID
  getArtistById: (req, res) => {
    const artist = artists.get(req.params.id);
    if (!artist) {
      return res.status(404).json({
        success: false,
        error: 'Artist not found'
      });
    }
    res.json({
      success: true,
      data: artist.toJSON()
    });
  },

  // Create new artist
  createArtist: (req, res) => {
    const { name, email, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required'
      });
    }

    const artist = new Artist(name, email, bio);
    artists.set(artist.id, artist);

    res.status(201).json({
      success: true,
      data: artist.toJSON()
    });
  },

  // Update artist
  updateArtist: (req, res) => {
    const artist = artists.get(req.params.id);
    if (!artist) {
      return res.status(404).json({
        success: false,
        error: 'Artist not found'
      });
    }

    artist.update(req.body);
    res.json({
      success: true,
      data: artist.toJSON()
    });
  },

  // Delete artist
  deleteArtist: (req, res) => {
    const artist = artists.get(req.params.id);
    if (!artist) {
      return res.status(404).json({
        success: false,
        error: 'Artist not found'
      });
    }

    artists.delete(req.params.id);
    res.json({
      success: true,
      message: 'Artist deleted successfully'
    });
  }
};

module.exports = artistController;
