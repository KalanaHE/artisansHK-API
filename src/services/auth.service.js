const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});

const signIn = async (data) => {
    try {
        const { email, password } = data;
        const user = await prisma.users.findUnique({ where: { email } });

        if (!user) {
            return response(httpStatus.NOT_FOUND, 'User not found', null);
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return response(httpStatus.UNAUTHORIZED, 'Invalid password', null);
        }

        const token = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFESPAN,
        });

        return response(httpStatus.OK, 'Success', { userId: user.id, userName: user.name, token });
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

const adminSignIn = async (data) => {
    try {
        const { email, password } = data;
        const user = await prisma.users.findFirst({ where: { email, userType: 'ADMIN' } });

        if (!user) {
            return response(httpStatus.NOT_FOUND, 'User not found', null);
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return response(httpStatus.UNAUTHORIZED, 'Invalid password', null);
        }

        const token = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFESPAN,
        });

        return response(httpStatus.OK, 'Success', { userId: user.id, userName: user.name, token, email: user.email });
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

const getUser = async (id) => {
    try {
        const user = await prisma.users.findFirst({
            where: { id: Number(id), userType: 'ADMIN' },
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

        if (!user) {
            return response(httpStatus.NOT_FOUND, 'User not found', null);
        }

        return response(httpStatus.OK, 'Success', { userId: user.id, userName: user.name, email: user.email });
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { signIn, adminSignIn, getUser };
