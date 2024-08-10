const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/admin-panel', {
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

//mongoose.connect('mongodb://localhost:27017/mydatabase');


module.exports = connectDB;
