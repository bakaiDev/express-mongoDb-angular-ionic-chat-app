const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post');
const AuthHelper = require('../Hellpers/AuthHelper');

router.get('/posts', AuthHelper.VerifyToken, PostController.GetAllPosts);
router.post('/post/add-post', AuthHelper.VerifyToken, PostController.AddPost);
router.post('/posts/add-like', AuthHelper.VerifyToken, PostController.AddLike);
module.exports = router;
