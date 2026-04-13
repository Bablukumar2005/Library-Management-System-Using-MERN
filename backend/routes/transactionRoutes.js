const express = require('express');
const router = express.Router();
const { issueBook, returnBook, getUserTransactions, getAllTransactions } = require('../controllers/transactionController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getAllTransactions);
router.route('/my').get(protect, getUserTransactions);
router.route('/issue').post(protect, issueBook);
router.route('/return').post(protect, returnBook);

module.exports = router;
