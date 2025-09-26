// routes/comment.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createComment, updateComment, deleteComment } = require('../controllers/commentController');

router.post('/', auth, createComment);
router.put('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);

module.exports = router;
