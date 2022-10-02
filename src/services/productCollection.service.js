const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});

const createProductCollectionRecord = async (data) => {
    try {
        const { collectedBy, collectedAt, colorId, quantity, productId, collectedFrom, geoCoordinates } = data;
        const createdRecord = await prisma.finishedProductsCollection.create({
            data: {
                collectedBy,
                collectedAt,
                colorId,
                quantity,
                productId,
                collectedFrom,
                geoCoordinates,
            },
        });

        return response(httpStatus.OK, 'Success', createdRecord);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { createProductCollectionRecord };
