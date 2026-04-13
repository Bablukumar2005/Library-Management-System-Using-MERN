const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

// @desc    Issue a book
// @route   POST /api/transactions/issue
// @access  Private
const issueBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'Book is not available for issue' });
    }

    // Check if user already has an active transaction for this book
    const existingTransaction = await Transaction.findOne({
      userId: req.user._id,
      bookId,
      status: 'Active',
    });

    if (existingTransaction) {
      return res.status(400).json({ message: 'You have already issued this book' });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Due in 14 days

    const transaction = new Transaction({
      userId: req.user._id,
      bookId,
      dueDate,
    });

    const createdTransaction = await transaction.save();

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json(createdTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Return a book
// @route   POST /api/transactions/return
// @access  Private
const returnBook = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const transaction = await Transaction.findById(transactionId).populate('bookId');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status === 'Returned') {
      return res.status(400).json({ message: 'Book already returned' });
    }

    transaction.returnDate = new Date();
    transaction.status = 'Returned';

    // Calculate fine: 10 rupees per day late
    const dueDate = new Date(transaction.dueDate);
    const returnDate = new Date(transaction.returnDate);
    
    if (returnDate > dueDate) {
      const diffTime = Math.abs(returnDate - dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      transaction.fine = diffDays * 10;
    }

    await transaction.save();

    const book = await Book.findById(transaction.bookId._id);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user transactions
// @route   GET /api/transactions/my
// @access  Private
const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).populate('bookId', 'title author coverImage');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private/Admin
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({}).populate('user', 'name email').populate('bookId', 'title author');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { issueBook, returnBook, getUserTransactions, getAllTransactions };
