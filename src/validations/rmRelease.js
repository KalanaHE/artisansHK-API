const { Joi, Segments } = require('celebrate');

module.exports = {
    rmRelease: {
        [Segments.BODY]: {
            issuedBy: Joi.number().required(),
            issuedAt: Joi.date().required(),
            colorId: Joi.number().required(),
            packageSize: Joi.number().required(),
            quantity: Joi.number().required(),
            forProduct: Joi.any(),
            issuedTo: Joi.number().required(),
            geoCoordinates: Joi.string(),
        },
    },
};
