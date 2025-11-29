const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

let sequelize;

if (process.env.DATABASE_URL) {
  // 🚀 PRODUCTION: Use the URL provided by Render
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Required for Render's free tier
      }
    }
  });
} else {
  // 🏠 LOCAL: Use your local computer settings
  sequelize = new Sequelize('taskmanagerdb', 'postgres', 'arshad@123', {
    host: 'localhost',
    dialect: 'postgres',
  });
}

module.exports = sequelize;