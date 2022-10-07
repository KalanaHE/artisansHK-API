const { asyncHandler } = require('../middleware');
const authService = require('../services/auth.service');

const signIn = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await authService.signIn(body);
    return res.status(data.statusCode).json(data);
});

const adminSignIn = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await authService.adminSignIn(body);
    return res.status(data.statusCode).json(data);
});

const getUser = asyncHandler(async (req, res) => {
    const {
        params: { id },
    } = req;
    const data = await authService.getUser(id);
    return res.status(data.statusCode).json(data);
});

module.exports = { signIn, adminSignIn, getUser };
