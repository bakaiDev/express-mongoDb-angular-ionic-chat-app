const Joi = require('joi');
const HttpStatus = require('http-status-codes');

module.exports = {
    CreateUser(req, res) {
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

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({message: error.details});
        }
    }
};

