const express = require('express');

const router = express.Router();

const UserController = require('../controllers/users');

const AuthHelper = require('../Hellpers/AuthHelper');

router.get('/users', AuthHelper.VerifyToken, UserController.GetAllUsers);

module.exports = router;
