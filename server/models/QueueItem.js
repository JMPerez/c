const uuidV4 = require('uuid/v4');

class QueueItem {
  constructor(options = {}) {
    this.id = options.id || uuidV4();
    this.track = options.track || {};
    this.user = options.user || {};
    this.voters = options.voters || [];
    this.startTimestamp = options.startTimestamp || null;
    this.queuedTimestamp = options.queuedTimestamp || Date.now();
  }
  toJSON() {
    return {
      id: this.id,
      user: this.user,
      track: this.track,
      voters: this.voters,
      startTimestamp: this.startTimestamp
    };
  }
}

module.exports = QueueItem;
