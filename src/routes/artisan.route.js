const express = require('express');
const { searchArtisanByEmpId, getAllArtisans, editArtisan } = require('../controllers/artisan.controller');

const router = express.Router();

router.route('/getAll').get(getAllArtisans);

router.route('/:empId').get(searchArtisanByEmpId);

router.route('/').patch(editArtisan);

module.exports = router;
