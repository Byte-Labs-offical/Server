const { users, owoProfiles } = require('../database');

class ProfileManager {
  async getOrCreate(userId, username) {
    const existing = await owoProfiles.get(userId);
    if (existing) {
      if (username && existing.username !== username) {
        await owoProfiles.update(userId, { username });
      }
      return existing;
    }

    const created = await owoProfiles.create({ userId, username });
    return created;
  }

  async update(userId, patch) {
    await owoProfiles.update(userId, patch);
    return this.getOrCreate(userId);
  }

  async listTop(limit = 10) {
    return owoProfiles.listTop(limit);
  }
}

module.exports = { ProfileManager };
