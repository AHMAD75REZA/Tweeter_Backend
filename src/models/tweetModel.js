const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for efficient querying
tweetSchema.index({ userId: 1, createdAt: -1 });

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
