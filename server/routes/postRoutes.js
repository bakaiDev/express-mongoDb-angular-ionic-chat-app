const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post');
const AuthHelper = require('../Hellpers/AuthHelper');

router.post('/post/add-post', AuthHelper.VerifyToken, PostController.AddPost);

module.exports = router;
