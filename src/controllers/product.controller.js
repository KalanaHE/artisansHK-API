const { asyncHandler } = require('../middleware');
const productService = require('../services/product.service');

const getProducts = asyncHandler(async (req, res) => {
    const data = await productService.getProducts();
    return res.status(data.statusCode).json(data);
});

module.exports = { getProducts };
