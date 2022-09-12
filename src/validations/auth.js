const { Joi, Segments } = require('celebrate');

module.exports = {
    signIn: {
        [Segments.BODY]: {
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    },
};
