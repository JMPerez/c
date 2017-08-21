class Bot {
  constructor(options) {
    this.image = options.image || '/static/robot-icon.png';
    this.id = options.id || 'Robot';
    this.recommendations = {};
  }

  async generateRecommendation(items, getToken, spotifyApi) {
    const trackIds = items.filter(i => i.user.type === 'user').map(i => i.track.id);

    if (trackIds.length) {
      const key = trackIds.join('-');
      if (!(key in this.recommendations)) {
        await getToken();
        const res = await spotifyApi.getRecommendations({ seed_tracks: trackIds });
        this.recommendations[key] = res.body.tracks;
      }
      if (this.recommendations[key].length) {
        return this.recommendations[key].shift();
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  toJSON() {
    return {
      id: this.id,
      images: [{ url: this.image }],
      type: 'robot'
    };
  }
}

module.exports = Bot;
