const { Joi, Segments } = require('celebrate');

module.exports = {
    grn: {
        [Segments.BODY]: {
            grnType: Joi.string().required(),
            userId: Joi.number().required(),
            colorId: Joi.number().required(),
            quantity: Joi.number().required(),
            productId: Joi.number(),
            packageSize: Joi.number(),
        },
    },
};
