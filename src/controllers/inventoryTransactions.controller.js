const { asyncHandler } = require('../middleware');
const inventoryTransactionService = require('../services/inventoryTransaction.service');

const createInventoryTransactionRecord = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await inventoryTransactionService.createInventoryTransactionRecord(body);
    return res.status(data.statusCode).json(data);
});

module.exports = { createInventoryTransactionRecord };
