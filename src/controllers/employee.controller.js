const { asyncHandler } = require('../middleware');
const employeeService = require('../services/employee.service');

const getAllEmployees = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await employeeService.getAllEmployees(body);
    return res.status(data.statusCode).json(data);
});

module.exports = { getAllEmployees };
