const HttpStatus = require('http-status-codes');
const Joi = require('joi');

const Post = require('../models/postModels');
const User = require('../models/userModels');

module.exports = {
    AddPost(req, res) {
        const schema = Joi.object({
            post: Joi.string()
                .required()
        });
        const {error, value} = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({msg: error.details});
        }

        const body = {
            user: req.user._id,
            username: req.user.username,
            post: req.body.post,
            created: new Date()
        };

        Post.create(body).then(async (post) => {
            await User.update({
                _id: req.user._id
            },{
                $push: {posts: {
                        postId: post._id,
                        post: req.body.post,
                        created: new Date()
                    }}
            });
            res.status(HttpStatus.CREATED).json({message:  'Post created', post})
        }).catch(error => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error occurred'
            })
        });
    }
};
