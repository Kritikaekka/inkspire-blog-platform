const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} = require('../controllers/followController');

router.post('/follow/:id', auth, followUser);
router.post('/unfollow/:id', auth, unfollowUser);
router.get('/followers/:id', getFollowers);
router.get('/following/:id', getFollowing);

module.exports = router;
