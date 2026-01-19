const Release = require('../models/Release');

// In-memory storage for releases (in production, use a database)
const releases = new Map();

const releaseController = {
  // Get all releases
  getAllReleases: (req, res) => {
    const { artistId, status } = req.query;
    let releaseList = Array.from(releases.values());

    // Filter by artist if provided
    if (artistId) {
      releaseList = releaseList.filter(r => r.artistId === artistId);
    }

    // Filter by status if provided
    if (status) {
      releaseList = releaseList.filter(r => r.status === status);
    }

    res.json({
      success: true,
      count: releaseList.length,
      data: releaseList.map(r => r.toJSON())
    });
  },

  // Get release by ID
  getReleaseById: (req, res) => {
    const release = releases.get(req.params.id);
    if (!release) {
      return res.status(404).json({
        success: false,
        error: 'Release not found'
      });
    }
    res.json({
      success: true,
      data: release.toJSON()
    });
  },

  // Create new release
  createRelease: (req, res) => {
    const { artistId, title, genre, releaseDate } = req.body;

    if (!artistId || !title || !genre || !releaseDate) {
      return res.status(400).json({
        success: false,
        error: 'artistId, title, genre, and releaseDate are required'
      });
    }

    const release = new Release(artistId, title, genre, releaseDate);
    releases.set(release.id, release);

    res.status(201).json({
      success: true,
      data: release.toJSON()
    });
  },

  // Update release
  updateRelease: (req, res) => {
    const release = releases.get(req.params.id);
    if (!release) {
      return res.status(404).json({
        success: false,
        error: 'Release not found'
      });
    }

    release.update(req.body);
    res.json({
      success: true,
      data: release.toJSON()
    });
  },

  // Delete release
  deleteRelease: (req, res) => {
    const release = releases.get(req.params.id);
    if (!release) {
      return res.status(404).json({
        success: false,
        error: 'Release not found'
      });
    }

    releases.delete(req.params.id);
    res.json({
      success: true,
      message: 'Release deleted successfully'
    });
  },

  // Add track to release
  addTrack: (req, res) => {
    const release = releases.get(req.params.id);
    if (!release) {
      return res.status(404).json({
        success: false,
        error: 'Release not found'
      });
    }

    const { title, duration, fileUrl, trackNumber } = req.body;
    if (!title || !duration) {
      return res.status(400).json({
        success: false,
        error: 'Title and duration are required'
      });
    }

    release.addTrack({ title, duration, fileUrl, trackNumber });
    res.json({
      success: true,
      data: release.toJSON()
    });
  },

  // Add distribution platform
  addPlatform: (req, res) => {
    const release = releases.get(req.params.id);
    if (!release) {
      return res.status(404).json({
        success: false,
        error: 'Release not found'
      });
    }

    const { platform } = req.body;
    if (!platform) {
      return res.status(400).json({
        success: false,
        error: 'Platform is required'
      });
    }

    release.addPlatform(platform);
    res.json({
      success: true,
      data: release.toJSON()
    });
  },

  // Update release status
  updateStatus: (req, res) => {
    const release = releases.get(req.params.id);
    if (!release) {
      return res.status(404).json({
        success: false,
        error: 'Release not found'
      });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }

    release.updateStatus(status);
    res.json({
      success: true,
      data: release.toJSON()
    });
  }
};

module.exports = releaseController;
