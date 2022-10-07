const express = require('express');
const { celebrate } = require('celebrate');
const validations = require('../validations');
const { signIn, adminSignIn, getUser } = require('../controllers/auth.controller');

const router = express.Router();

router.route('/signin').post([celebrate(validations.auth.signIn)], signIn);
router.route('/admin/signin').post([celebrate(validations.auth.signIn)], adminSignIn);
router.route('/admin/getUser/:id').get(getUser);

module.exports = router;
