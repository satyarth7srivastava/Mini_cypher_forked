const mongoose = require('mongoose');
require('dotenv').config(); 

// MongoDB connection function
const connectDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/Ciph_project', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
