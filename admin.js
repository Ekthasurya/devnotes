require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');

const ADMIN_EMAIL = 'surya@gmail.com'; 
const ADMIN_PASSWORD = 'surya123';  
const ADMIN_USERNAME = 'surya';         

async function initializeAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL)

    const existingAdmin = await User.findOne({ role: 'admin' });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 8);

      const admin = new User({
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
      });

      await admin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error initializing admin user:', error);
  }
}

initializeAdmin();
