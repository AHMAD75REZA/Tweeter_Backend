const Tweet = require('../models/tweetModel');

// Post a Tweet
exports.postTweet = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.userId;

  try {
    const tweet = await Tweet.create({ userId, text });
    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch User Timeline with Cursor-Based Pagination
exports.getUserTimeline = async (req, res) => {
  const { userId } = req.params;
  const { cursor } = req.query;

  try {
    const query = { userId };
    if (cursor) {
      query.createdAt = { $lt: cursor };
    }

    const tweets = await Tweet.find(query)
      .sort({ createdAt: -1 })
      .limit(10);

    const nextCursor = tweets.length > 0 ? tweets[tweets.length - 1].createdAt : null;

    res.json({ tweets, nextCursor });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
