const express = require('express');
const { createInventoryTransactionRecord, getArtisanWiseGrnProducts } = require('../controllers/inventoryTransactions.controller');

const router = express.Router();

router.route('/').post(createInventoryTransactionRecord);
router.route('/artisan-wise-weekly-grn-products').post(getArtisanWiseGrnProducts);

module.exports = router;
