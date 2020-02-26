const Joi = require('joi');
const HttpStatus = require('http-status-codes');

const User = require('../models/userModels');
const Helpers = require('../Hellpers/helper');

module.exports = {
   async CreateUser(req, res) {
        const schema = Joi.object({
            username: Joi.string()
                .min(6)
                .max(30)
                .required(),
            email: Joi.string()
                .min(6)
                .max(30)
                .required()
                .email(),
            password: Joi.string()
                .min(6)
                .max(30)
                .required() });

        const {error, value} = schema.validate(req.body);
       console.log(value);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({message: error.details});
        }

       const userEmail = await User.findOne({email: Helpers.lowerCase( req.body.email)});
       if (userEmail) {
           return res.status(HttpStatus.CONFLICT).json({message: 'Email already exist'});
       }
       const userName = await User.findOne({username: Helpers.firstUpper( req.body.username)});
       if (userName) {
           return res.status(HttpStatus.CONFLICT).json({message: 'Username already exist'});
       }
    }
};

