const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post');
const AuthHelper = require('../Hellpers/AuthHelper');

router.get('/posts', AuthHelper.VerifyToken, PostController.GetAllPosts);
router.post('/post/add-post', AuthHelper.VerifyToken, PostController.AddPost);
router.post('/post/add-like', AuthHelper.VerifyToken, PostController.AddLike);
router.post('/post/add-comment', AuthHelper.VerifyToken, PostController.AddComment);
module.exports = router;
