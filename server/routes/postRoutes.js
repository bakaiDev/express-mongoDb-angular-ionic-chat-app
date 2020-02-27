const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post');

router.post('/post/add-post', PostController.AddPost);

module.exports = router;
