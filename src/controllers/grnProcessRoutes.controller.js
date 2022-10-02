const { asyncHandler } = require('../middleware');
const grnProcessService = require('../services/grnProcess.service');

const createGrnProcessRecord = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await grnProcessService.createGrnProcessRecord(body);
    return res.status(data.statusCode).json(data);
});

module.exports = { createGrnProcessRecord };
