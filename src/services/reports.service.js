const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});

const getArtisanWiseReport = async (data) => {
    try {
        const { artisanId, startDate, endDate } = data;
        const report = await prisma.rmRelease.findMany({
            where: { issuedTo: artisanId, timestamp: { gte: startDate, lte: endDate } },
            include: { artisan: { include: { village: true } }, color: true, product: true, rmReleasePackageSizes: true, user: true },
        });

        return response(httpStatus.OK, 'Success', report);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

const getVillageWiseReport = async (data) => {
    try {
        const { villageId, startDate, endDate } = data;

        const _artisanIdsOfVillage = await prisma.artisans.findMany({ where: { villageId }, select: { id: true } });
        const artisanIdsOfVillage = _artisanIdsOfVillage.map((i) => i.id);

        const report = await prisma.rmRelease.findMany({
            where: { issuedTo: { in: artisanIdsOfVillage }, timestamp: { gte: startDate, lte: endDate } },
            include: { artisan: true, color: true, product: true, rmReleasePackageSizes: true, user: true },
        });

        return response(httpStatus.OK, 'Success', report);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { getArtisanWiseReport, getVillageWiseReport };
