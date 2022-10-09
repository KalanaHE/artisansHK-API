const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});

const getArtisanWiseRmIssueReport = async (data) => {
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

const getVillageWiseRmIssueReport = async (data) => {
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

const getArtisanWiseCollectionReport = async (data) => {
    try {
        const { artisanId, startDate, endDate } = data;
        const report = await prisma.finishedProductsCollection.findMany({
            where: { collectedFrom: artisanId, timestamp: { gte: startDate, lte: endDate } },
            include: {
                artisan: { include: { village: true } },
                color: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        userType: true,
                        teamId: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                product: true,
            },
        });

        return response(httpStatus.OK, 'Success', report);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

const getGrnReport = async (data) => {
    try {
        const { employeeId, type = ['IN', 'OUT'], startDate, endDate } = data;

        const report = await prisma.grn.findMany({
            where: { userId: employeeId, grnType: { in: type }, timestamp: { gte: startDate, lte: endDate } },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        userType: true,
                        teamId: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                color: true,
                rmReleasePackageSizes: true,
                product: true,
            },
        });

        return response(httpStatus.OK, 'Success', report);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { getArtisanWiseRmIssueReport, getVillageWiseRmIssueReport, getArtisanWiseCollectionReport, getGrnReport };
