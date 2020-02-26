const Joi = require('joi');

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
            return res.status(500).json({message: error.details});
        }
    }
};

