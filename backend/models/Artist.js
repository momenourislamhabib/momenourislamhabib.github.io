const { v4: uuidv4 } = require('uuid');

class Artist {
  constructor(name, email, bio = '') {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(updates) {
    if (updates.name) this.name = updates.name;
    if (updates.email) this.email = updates.email;
    if (updates.bio !== undefined) this.bio = updates.bio;
    this.updatedAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      bio: this.bio,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Artist;
