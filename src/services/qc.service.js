const httpStatus = require('http-status');
const { response } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const getAllQualityInspectors = async () => {
    try {
        const qcInspectors = await prisma.qcInspectors.findMany();

        return response(httpStatus.OK, 'Success', qcInspectors);
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

const regularizeGrn = async (info) => {
    try {
        const { transactionId, rejectCount, rejectedBy } = info;

        const originalData = await prisma.inventoryTransactions.findUnique({ where: { id: transactionId } });

        if (rejectCount > originalData.quantity || rejectCount < 0) {
            return response(httpStatus.INTERNAL_SERVER_ERROR, 'Reject count is greater than original quantity/reject count not valid', null, null);
        }

        if (originalData.quantity === 1) {
            await prisma.inventoryTransactions.update({
                where: { id: transactionId },
                data: { isRejectedAfterGrnIn: true, rejectedByAfterGrnIn: rejectedBy },
            });

            return response(httpStatus.OK, 'Success', {});
        } else {
            // let temp = [];

            // for (let index = 0; index < originalData.quantity; index++) {
            //     temp.push(originalData);
            // }

            // if reject count is 1
            if (rejectCount === 1) {
                await prisma.$transaction(async (prisma) => {
                    await prisma.inventoryTransactions.update({ where: { id: transactionId }, data: { quantity: originalData.quantity - 1 } });
                    await prisma.inventoryTransactions.create({
                        data: {
                            transactionType: originalData.transactionType,
                            isReturningRm: originalData.isReturningRm,
                            issuer: originalData.issuer,
                            receiver: originalData.receiver,
                            colorId: originalData.colorId,
                            packageSize: originalData.packageSize,
                            productId: originalData.productId,
                            collectedProductWeight: originalData.collectedProductWeight,
                            artisanId: originalData.artisanId,
                            isRejected: originalData.isRejected,
                            qcBy: originalData.qcBy,
                            isTrainee: originalData.isTrainee,
                            quantity: 1, // <== modification
                            isRejectedAfterGrnIn: true, // <== modification
                            rejectedByAfterGrnIn: rejectedBy, // <== modification
                        },
                    });
                });

                return response(httpStatus.OK, 'Success', {});
            } else if (rejectCount === originalData.quantity) {
                await prisma.inventoryTransactions.update({
                    where: { id: transactionId },
                    data: { isRejectedAfterGrnIn: true, rejectedByAfterGrnIn: rejectedBy },
                });

                return response(httpStatus.OK, 'Success', {});
            } else {
                await prisma.$transaction(async (prisma) => {
                    await prisma.inventoryTransactions.update({
                        where: { id: transactionId },
                        data: { quantity: originalData.quantity - rejectCount },
                    });

                    await prisma.inventoryTransactions.create({
                        data: {
                            transactionType: originalData.transactionType,
                            isReturningRm: originalData.isReturningRm,
                            issuer: originalData.issuer,
                            receiver: originalData.receiver,
                            colorId: originalData.colorId,
                            packageSize: originalData.packageSize,
                            productId: originalData.productId,
                            collectedProductWeight: originalData.collectedProductWeight,
                            artisanId: originalData.artisanId,
                            isRejected: originalData.isRejected,
                            qcBy: originalData.qcBy,
                            isTrainee: originalData.isTrainee,
                            quantity: rejectCount, // <== modification
                            isRejectedAfterGrnIn: true, // <== modification
                            rejectedByAfterGrnIn: rejectedBy, // <== modification
                        },
                    });
                });

                return response(httpStatus.OK, 'Success', {});
            }
        }
    } catch (error) {
        return response(httpStatus.INTERNAL_SERVER_ERROR, error.message, null, error);
    }
};

module.exports = { getAllQualityInspectors, regularizeGrn };
