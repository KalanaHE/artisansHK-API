const express = require('express');
const { getAllEmployees } = require('../controllers/employee.controller');

const router = express.Router();

router.route('/').get(getAllEmployees);

module.exports = router;
