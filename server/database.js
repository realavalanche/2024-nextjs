/* eslint-disable no-undef */

const mongoose = require('mongoose');
// require('dotenv').config();

// const url = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://sid318:Computer4@next-cluster.jisoo.mongodb.net/users?retryWrites=true&w=majority&appName=next-cluster',
      {},
    );
    console.log('Database is connected');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
