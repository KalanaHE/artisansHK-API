const express = require('express');
const { searchArtisanByEmpId, getAllArtisans } = require('../controllers/artisan.controller');

const router = express.Router();

router.route('/getAll').get(getAllArtisans);

router.route('/:empId').get(searchArtisanByEmpId);

module.exports = router;
