const express = require('express');
const { getAllEmployees } = require('../controllers/employee.controller');

const router = express.Router();

router.route('/').post(getAllEmployees);

module.exports = router;
