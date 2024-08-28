const express = require('express');
const { postTweet, getUserTimeline } = require('../controllers/tweetController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, postTweet);
router.get('/:userId/timeline', protect, getUserTimeline);

module.exports = router;
