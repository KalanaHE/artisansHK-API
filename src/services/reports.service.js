const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});

const getArtisanWiseReport = async (data) => {
    try {
        const { artisanId, start, end } = data;
        const createdRecord = await prisma.rmRelease.findMany({
            where: { issuedTo: artisanId, timestamp: { gte: start, lte: end } },
            // include: { artisan: true, color: true, product: true, rmReleasePackageSizes: true, user: true },
        });

        return response(httpStatus.OK, 'Success', createdRecord);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { getArtisanWiseReport };
