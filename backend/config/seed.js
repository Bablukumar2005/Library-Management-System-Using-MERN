const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');
const User = require('../models/User');
const Book = require('../models/Book');

// Load env vars
dotenv.config({ path: __dirname + '/../.env' });

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Book.deleteMany();

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // In a real app, ensure to hash this if pre-saving middleware doesn't
        role: 'admin',
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: 'password123',
        role: 'user',
      },
    ];

    const books = [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Fiction',
        isbn: '9780743273565',
        totalCopies: 5,
        availableCopies: 5,
      },
      {
        title: '1984',
        author: 'George Orwell',
        category: 'Dystopian',
        isbn: '9780451524935',
        totalCopies: 3,
        availableCopies: 3,
      },
    ];

    await User.insertMany(users);
    await Book.insertMany(books);

    console.log('Data Imported Successfuly!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
