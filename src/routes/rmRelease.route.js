const express = require('express');
const { celebrate } = require('celebrate');
const validations = require('../validations');
const { createRmReleaseRecord } = require('../controllers/rmRelease.controller');

const router = express.Router();

router.route('/').post([celebrate(validations.rmRelease.rmRelease)], createRmReleaseRecord);

module.exports = router;
