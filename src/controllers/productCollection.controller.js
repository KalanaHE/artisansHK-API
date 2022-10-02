const { asyncHandler } = require('../middleware');
const productCollectionService = require('../services/productCollection.service');

const createProductCollectionRecord = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await productCollectionService.createProductCollectionRecord(body);
    return res.status(data.statusCode).json(data);
});

module.exports = { createProductCollectionRecord };
