const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 52428800,
  
  // Supported distribution platforms
  platforms: [
    'Spotify',
    'Apple Music',
    'YouTube Music',
    'Amazon Music',
    'Tidal',
    'Deezer',
    'SoundCloud',
    'Bandcamp'
  ],

  // Supported music genres
  genres: [
    'Pop',
    'Rock',
    'Hip Hop',
    'R&B',
    'Electronic',
    'Jazz',
    'Classical',
    'Country',
    'Folk',
    'Reggae',
    'Blues',
    'Metal',
    'Indie',
    'World',
    'Other'
  ]
};

module.exports = config;
