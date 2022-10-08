const express = require('express');
const { getAllVillages } = require('../controllers/village.controller');

const router = express.Router();

router.route('/getAll').get(getAllVillages);

module.exports = router;
