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

        const transactionsData = await prisma.inventoryTransactions.findMany({
            where: { transactionType: 'IN', artisan: { employeeId: artisanEmployeeId } },
            include: { artisan: { include: { village: true } }, product: { include: { category: true } }, Issuer: true, Receiver: true },
        });

        return response(httpStatus.OK, 'Success', transactionsData);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { createInventoryTransactionRecord, getArtisanWiseGrnProducts };
