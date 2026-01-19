const request = require('supertest');
const app = require('../server');

describe('Music Distribution API', () => {
  let artistId;
  let releaseId;

  // Artist Tests
  describe('Artist Endpoints', () => {
    it('should create a new artist', async () => {
      const res = await request(app)
        .post('/api/artists')
        .send({
          name: 'Test Artist',
          email: 'test@example.com',
          bio: 'Test bio'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Test Artist');
      artistId = res.body.data.id;
    });

    it('should get all artists', async () => {
      const res = await request(app).get('/api/artists');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should get artist by id', async () => {
      const res = await request(app).get(`/api/artists/${artistId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(artistId);
    });

    it('should update artist', async () => {
      const res = await request(app)
        .put(`/api/artists/${artistId}`)
        .send({
          name: 'Updated Artist Name'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Updated Artist Name');
    });

    it('should fail to create artist without required fields', async () => {
      const res = await request(app)
        .post('/api/artists')
        .send({
          name: 'Test'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  // Release Tests
  describe('Release Endpoints', () => {
    it('should create a new release', async () => {
      const res = await request(app)
        .post('/api/releases')
        .send({
          artistId: artistId,
          title: 'Test Album',
          genre: 'Pop',
          releaseDate: '2024-01-01'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Album');
      releaseId = res.body.data.id;
    });

    it('should get all releases', async () => {
      const res = await request(app).get('/api/releases');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should get releases by artist', async () => {
      const res = await request(app).get(`/api/releases?artistId=${artistId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should add track to release', async () => {
      const res = await request(app)
        .post(`/api/releases/${releaseId}/tracks`)
        .send({
          title: 'Test Track',
          duration: '3:45',
          fileUrl: '/uploads/test.mp3',
          trackNumber: 1
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.tracks.length).toBe(1);
    });

    it('should add platform to release', async () => {
      const res = await request(app)
        .post(`/api/releases/${releaseId}/platforms`)
        .send({
          platform: 'Spotify'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.platforms).toContain('Spotify');
    });

    it('should update release status', async () => {
      const res = await request(app)
        .patch(`/api/releases/${releaseId}/status`)
        .send({
          status: 'submitted'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('submitted');
    });
  });

  // Config Tests
  describe('Configuration Endpoint', () => {
    it('should get config data', async () => {
      const res = await request(app).get('/api/config');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.platforms).toBeDefined();
      expect(res.body.data.genres).toBeDefined();
    });
  });

  // Cleanup
  describe('Cleanup', () => {
    it('should delete release', async () => {
      const res = await request(app).delete(`/api/releases/${releaseId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should delete artist', async () => {
      const res = await request(app).delete(`/api/artists/${artistId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
