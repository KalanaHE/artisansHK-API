const express = require('express');
const { createInventoryTransactionRecord } = require('../controllers/inventoryTransactions.controller');

const router = express.Router();

router.route('/').post(createInventoryTransactionRecord);

module.exports = router;
