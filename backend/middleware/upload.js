const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR || './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter for audio files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp3|wav|flac|m4a|aac/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only audio files are allowed (mp3, wav, flac, m4a, aac)'));
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 52428800 // 50MB default
  },
  fileFilter: fileFilter
});

module.exports = upload;
