const express = require('express');
const { celebrate } = require('celebrate');
const validations = require('../validations');
const { createGrnProcessRecord } = require('../controllers/grnProcessRoutes.controller');

const router = express.Router();

router.route('/').post([celebrate(validations.grn.grn)], createGrnProcessRecord);

module.exports = router;
