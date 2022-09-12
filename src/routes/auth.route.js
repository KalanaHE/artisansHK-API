const express = require('express');
const { celebrate } = require('celebrate');
const validations = require('../validations');
const { signIn } = require('../controllers/auth.controller');

const router = express.Router();

router.route('/signin').post([celebrate(validations.auth.signIn)], signIn);

module.exports = router;
