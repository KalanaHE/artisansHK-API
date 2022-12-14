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
        const miniChartStat = [];

        for (let i = 0; i < todayRmIssues.length; i++) {
            sum += todayRmIssues[i].quantity * todayRmIssues[i].rmReleasePackageSizes.packageWeight;
            miniChartStat.push(todayRmIssues[i].quantity * todayRmIssues[i].rmReleasePackageSizes.packageWeight);
        }

        return response(httpStatus.OK, 'Success', { todayRmReleaseSum: sum, miniChartStat });
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
        const miniChartStat = [];

        for (let i = 0; i < todayRmIssues.length; i++) {
            sum += todayRmIssues[i].quantity * todayRmIssues[i].rmReleasePackageSizes.packageWeight;
            miniChartStat.push(todayRmIssues[i].quantity * todayRmIssues[i].rmReleasePackageSizes.packageWeight);
        }

        return response(httpStatus.OK, 'Success', { thisMonthRmReleaseSum: sum, miniChartStat });
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

const getThisMonthCollectionStats = async () => {
    try {
        var date = new Date();

        var currentMonthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        currentMonthStart.setHours(0, 0, 0, 0);

        var currentMonthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        currentMonthEnd.setHours(23, 59, 59, 999);

        const thisMonthCollections = await prisma.finishedProductsCollection.groupBy({
            by: ['productId'],
            _sum: { quantity: true },
            where: { timestamp: { gte: currentMonthStart, lte: currentMonthEnd } },
        });

        const _data = {
            products: [],
            quantities: [],
        };

        for (let index = 0; index < thisMonthCollections.length; index++) {
            const product = await prisma.products.findUnique({ where: { id: thisMonthCollections[index].productId } });
            _data.products.push(`${product.productName} - ${product.productCode}`);
            _data.quantities.push(thisMonthCollections[index]._sum.quantity);
        }

        return response(httpStatus.OK, 'Success', _data);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { getTodayRmIssueTotal, getThisMonthRmIssueTotal, getThisMonthCollectionStats };
