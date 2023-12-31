const mongoose = require('mongoose');
console.log (process.env.MONGODB_URI)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
