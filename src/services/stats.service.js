const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const getTodayRmIssueTotal = async () => {
    try {
        var todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        var todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const todayRmIssues = await prisma.rmRelease.findMany({
            where: { timestamp: { gte: todayStart, lte: todayEnd } },
            include: { rmReleasePackageSizes: true },
        });

        var sum = 0;

        for (let i = 0; i < todayRmIssues.length; i++) {
            sum += todayRmIssues[i].quantity * todayRmIssues[i].rmReleasePackageSizes.packageWeight;
        }

        return response(httpStatus.OK, 'Success', { todayRmReleaseSum: sum });
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

const getThisMonthRmIssueTotal = async () => {
    try {
        var date = new Date();

        var currentMonthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        currentMonthStart.setHours(0, 0, 0, 0);

        var currentMonthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        currentMonthEnd.setHours(23, 59, 59, 999);

        const todayRmIssues = await prisma.rmRelease.findMany({
            where: { timestamp: { gte: currentMonthStart, lte: currentMonthEnd } },
            include: { rmReleasePackageSizes: true },
        });

        var sum = 0;

        for (let i = 0; i < todayRmIssues.length; i++) {
            sum += todayRmIssues[i].quantity * todayRmIssues[i].rmReleasePackageSizes.packageWeight;
        }

        return response(httpStatus.OK, 'Success', { thisMonthRmReleaseSum: sum });
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { getTodayRmIssueTotal, getThisMonthRmIssueTotal };
