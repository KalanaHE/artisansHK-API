const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});

const getPackageSizes = async () => {
    try {
        const packageSizes = await prisma.rmReleasePackageSizes.findMany();

        return response(httpStatus.OK, 'Success', packageSizes);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { getPackageSizes };
