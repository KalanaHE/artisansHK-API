const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});

const getAllQualityInspectors = async () => {
    try {
        const qcInspectors = await prisma.qcInspectors.findMany();

        return response(httpStatus.OK, 'Success', qcInspectors);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { getAllQualityInspectors };
