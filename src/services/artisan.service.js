const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const searchArtisanByEmpId = async (employeeId) => {
    try {
        const artisan = await prisma.artisans.findFirst({ where: { employeeId }, include: { village: true } });

        return response(httpStatus.OK, 'Success', artisan);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

const getAllArtisans = async () => {
    try {
        const artisans = await prisma.artisans.findMany();

        return response(httpStatus.OK, 'Success', artisans);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { searchArtisanByEmpId, getAllArtisans };
