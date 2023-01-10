const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const createInventoryTransactionRecord = async (data) => {
    try {
        const createdRecord = await prisma.inventoryTransactions.create({ data });

        return response(httpStatus.OK, 'Success', createdRecord);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

const getArtisanWiseGrnProducts = async (data) => {
    try {
        const { artisanEmployeeId } = data;

        //today ending datetime
        const todayEndDate = new Date();
        //7 dayes befor start date
        const sevenDaysBeforeStartDate = new Date(new Date().setDate(new Date().getDate() - 7));

        const transactionsData = await prisma.inventoryTransactions.findMany({
            where: {
                transactionType: 'IN',
                artisan: { employeeId: artisanEmployeeId },
                OR: { isRejectedAfterGrnIn: false, isRejected: false },
                timestamp: {
                    gte: sevenDaysBeforeStartDate,
                    lte: todayEndDate,
                },
            },
            include: { artisan: { include: { village: true } }, product: { include: { category: true } }, Issuer: true, Receiver: true },
        });

        return response(httpStatus.OK, 'Success', transactionsData);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { createInventoryTransactionRecord, getArtisanWiseGrnProducts };
