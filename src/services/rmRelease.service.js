const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});

const createRmReleaseRecord = async (data) => {
    try {
        const { issuedBy, issuedAt, colorId, packageSize, quantity, forProduct, issuedTo, geoCoordinates } = data;
        const createdRecord = await prisma.rmRelease.create({
            data: {
                issuedBy,
                issuedAt,
                colorId,
                packageSize,
                quantity,
                forProduct,
                issuedTo,
                geoCoordinates,
            },
        });

        return response(httpStatus.OK, 'Success', createdRecord);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { createRmReleaseRecord };
