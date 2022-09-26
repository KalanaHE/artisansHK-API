const express = require('express');
const { searchArtisanByEmpId } = require('../controllers/artisan.controller');

const router = express.Router();

router.route('/:empId').get(searchArtisanByEmpId);

module.exports = router;
