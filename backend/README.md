# Music Distribution Backend API

A RESTful API backend for managing music distribution to various streaming platforms.

## Features

- **Artist Management**: Create, read, update, and delete artist profiles
- **Release Management**: Manage music releases with tracks and metadata
- **Platform Distribution**: Track distribution to multiple streaming platforms (Spotify, Apple Music, etc.)
- **File Upload**: Handle audio file uploads with validation
- **Status Tracking**: Monitor release status (draft, submitted, distributed)

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
5. Start the server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Artists

#### Get All Artists
```
GET /api/artists
```
Returns a list of all artists.

#### Get Artist by ID
```
GET /api/artists/:id
```
Returns a specific artist by ID.

#### Create Artist
```
POST /api/artists
Content-Type: application/json

{
  "name": "Artist Name",
  "email": "artist@example.com",
  "bio": "Artist biography"
}
```

#### Update Artist
```
PUT /api/artists/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "bio": "Updated biography"
}
```

#### Delete Artist
```
DELETE /api/artists/:id
```

### Releases

#### Get All Releases
```
GET /api/releases
```
Optional query parameters:
- `artistId`: Filter by artist
- `status`: Filter by status (draft, submitted, distributed)

#### Get Release by ID
```
GET /api/releases/:id
```

#### Create Release
```
POST /api/releases
Content-Type: application/json

{
  "artistId": "artist-uuid",
  "title": "Album Title",
  "genre": "Pop",
  "releaseDate": "2024-01-01"
}
```

#### Update Release
```
PUT /api/releases/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "submitted"
}
```

#### Delete Release
```
DELETE /api/releases/:id
```

#### Add Track to Release
```
POST /api/releases/:id/tracks
Content-Type: application/json

{
  "title": "Track Title",
  "duration": "3:45",
  "fileUrl": "/uploads/audio-file.mp3",
  "trackNumber": 1
}
```

#### Add Distribution Platform
```
POST /api/releases/:id/platforms
Content-Type: application/json

{
  "platform": "Spotify"
}
```

#### Update Release Status
```
PATCH /api/releases/:id/status
Content-Type: application/json

{
  "status": "distributed"
}
```

### File Upload

#### Upload Audio File
```
POST /api/upload
Content-Type: multipart/form-data

audio: [audio file]
```
Supported formats: mp3, wav, flac, m4a, aac
Max file size: 50MB (configurable)

### Configuration

#### Get Platform and Genre Options
```
GET /api/config
```
Returns available distribution platforms and music genres.

## Data Models

### Artist
```javascript
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "bio": "string",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

### Release
```javascript
{
  "id": "uuid",
  "artistId": "uuid",
  "title": "string",
  "genre": "string",
  "releaseDate": "ISO date",
  "tracks": [
    {
      "id": "uuid",
      "title": "string",
      "duration": "string",
      "fileUrl": "string",
      "trackNumber": "number"
    }
  ],
  "platforms": ["string"],
  "status": "draft|submitted|distributed",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `UPLOAD_DIR`: Directory for uploaded files (default: ./uploads)
- `MAX_FILE_SIZE`: Maximum file upload size in bytes (default: 52428800 - 50MB)

## Supported Distribution Platforms

- Spotify
- Apple Music
- YouTube Music
- Amazon Music
- Tidal
- Deezer
- SoundCloud
- Bandcamp

## Supported Genres

Pop, Rock, Hip Hop, R&B, Electronic, Jazz, Classical, Country, Folk, Reggae, Blues, Metal, Indie, World, Other

## Testing

Run tests with:
```bash
npm test
```

## Architecture

The backend uses a simple in-memory storage solution for demonstration purposes. In production, this should be replaced with a proper database like MongoDB, PostgreSQL, or MySQL.

### Directory Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/          # Data models
├── routes/          # API routes
├── server.js        # Main application entry point
└── package.json     # Dependencies
```

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Authentication and authorization
- Analytics and reporting
- Automated platform distribution
- Payment and royalty tracking
- Email notifications
- Advanced search and filtering
- API rate limiting
- Comprehensive testing suite

## License

MIT
