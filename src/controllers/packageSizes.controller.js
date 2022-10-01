const { asyncHandler } = require('../middleware');
const packageSizesService = require('../services/packageSizes.service');

const getPackageSizes = asyncHandler(async (req, res) => {
    const data = await packageSizesService.getPackageSizes();
    return res.status(data.statusCode).json(data);
});

module.exports = { getPackageSizes };
