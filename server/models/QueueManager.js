const fs = require('fs');

class QueueManager {
  constructor(options) {
    this.playingContext = {
      track: null,
      user: null,
      startTimestamp: null
    };
    this.queue = [];
    this.onQueueChanged = options.onQueueChanged;
    this.onQueueEnded = options.onQueueEnded;
    this.onPlay = options.onPlay;
    this.getToken = options.getToken;
    this.spotifyApi = options.spotifyApi;
    this.playedHistory = [];
    this.radioMasterId = options.radioMasterId;
    this.timer = null;
  }

  handleQueueChanged() {
    this.sort();
    this.save();
    this.onQueueChanged();
  }

  getPlayingContext() {
    return this.playingContext;
  }

  getQueue() {
    return this.queue;
  }

  sort() {
    this.queue.sort((a, b) => {
      const diffVoters = b.voters.length - a.voters.length;
      if (diffVoters !== 0) {
        return diffVoters;
      } else {
        return a.queuedTimestamp - b.queuedTimestamp;
      }
    });
  }

  addItem(queueItem) {
    this.queue.push(queueItem);
    this.handleQueueChanged();
    if (this.playingContext.track === null) {
      this.play();
    }
  }

  removeId(user, id) {
    const index = this.queue.findIndex(item => item.id === id);
    if (index !== -1 && this.queue[index].user.id === user.id) {
      this.queue.splice(index, 1);
      this.handleQueueChanged();
    }
  }

  init() {
    this.play();
  }

  play() {
    console.log('api.js > play');
    if (this.queue.length > 0) {
      console.log('api.js > play has queue');
      // something to play!
      const queueItem = this.queue.shift();
      let progress_ms = queueItem.track.progress_ms || 0;
      if (progress_ms < 2000) {
        progress_ms = 0;
      }
      this.handleQueueChanged();
      this.playingContext = {
        track: queueItem.track,
        user: queueItem.user,
        startTimestamp: Date.now(),
        voters: queueItem.voters
      };
      this.playedHistory.push({
        track: queueItem.track,
        user: queueItem.user
      });
      this.timer = setTimeout(() => {
        this.play();
      }, 2000 + queueItem.track.duration_ms);
      this.onPlay();
    } else {
      this.playingContext = {
        track: null,
        user: null,
        startTimestamp: null,
        voters: []
      };

      this.onQueueEnded();
    }
  }

  voteUpId(user, id) {
    const index = this.queue.findIndex(item => item.id === id);
    if (index === -1) return false;
    const voters = this.queue[index].voters;
    if (voters) {
      const userVotes = voters.filter(v => v.id === user.id);
      if (userVotes.length === 0) {
        this.queue[index].voters.push(user);
        this.handleQueueChanged();
        return true;
      }
    }
  }

  changeRadioMasterId(userId) {
    console.log('Inside queueManager ' + userId);
    if (userId === 'Robot') {
      userId = null;
    }
    this.radioMasterId = userId;
    this.queue = [];
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.play();
  }

  save() {
    fs.writeFileSync(
      './queue.json',
      JSON.stringify({
        playingContext: this.playingContext,
        queue: this.queue,
        radioMasterId: this.radioMasterId
      }),
      ''
    );
  }

  read() {
    try {
      const data = JSON.parse(fs.readFileSync('./queue.json'));
      this.playingContext = data.playingContext;
      this.queue = data.queue;
      this.radioMasterId = data.radioMasterId;
    } catch (e) {
      // do nothing;
    }
  }
}

module.exports = QueueManager;
