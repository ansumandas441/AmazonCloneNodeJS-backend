const express = require('express');
const router = express.Router();

router.post('/add');
router.post('/remove');
router.post('/update');
router.post('/view');
router.post('/clear');
router.post('/checkout');
router.post('/coupon');
router.post('/total');
router.post('/save');

module.exports = router;
