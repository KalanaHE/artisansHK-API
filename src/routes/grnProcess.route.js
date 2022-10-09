const express = require('express');
const { createGrnProcessRecord } = require('../controllers/grnProcessRoutes.controller');

const router = express.Router();

router.route('/').post(createGrnProcessRecord);

module.exports = router;
