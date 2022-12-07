const { asyncHandler } = require('../middleware');
const artisanService = require('../services/artisan.service');

const searchArtisanByEmpId = asyncHandler(async (req, res) => {
    const {
        params: { empId },
    } = req;
    const data = await artisanService.searchArtisanByEmpId(empId);
    return res.status(data.statusCode).json(data);
});

const getAllArtisans = asyncHandler(async (req, res) => {
    const data = await artisanService.getAllArtisans();
    return res.status(data.statusCode).json(data);
});

const editArtisan = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await artisanService.editArtisan(body);
    return res.status(data.statusCode).json(data);
});

module.exports = { searchArtisanByEmpId, getAllArtisans, editArtisan };
