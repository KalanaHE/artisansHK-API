const { Joi, Segments } = require('celebrate');

module.exports = {
    grn: {
        [Segments.BODY]: {
            collectedBy: Joi.number().required(),
            collectedAt: Joi.date().required(),
            colorId: Joi.number().required(),
            quantity: Joi.number().required(),
            productId: Joi.number().required(),
            collectedFrom: Joi.number().required(),
            geoCoordinates: Joi.string(),
        },
    },
};
