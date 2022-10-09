const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});

const getAllEmployees = async () => {
    try {
        const employees = await prisma.users.findMany({
            where: { userType: 'GENERAL_EMPLOYEE' },
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
        });

        return response(httpStatus.OK, 'Success', employees);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { getAllEmployees };
