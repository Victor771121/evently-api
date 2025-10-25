// src/models/index.js

import { Sequelize } from 'sequelize';
import config from '../config/config.json' with { type: 'json' };
import userModel from './user.model.js'; // Import the model FUNCTION

// 1. Determine which environment to use
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;
let db = {};

// 2. Instantiate Sequelize using the DB_URL environment variable
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  // If not using an environment variable, use individual config settings
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

// 3. Initialize the models
// Call the function from user.model.js, passing the instance and DataTypes
db.User = userModel(sequelize, Sequelize.DataTypes);

// 4. Set up associations (optional, but standard practice)
// if (db.User.associate) {
//     db.User.associate(db);
// }

db.sequelize = sequelize; // Export the instance itself
db.Sequelize = Sequelize; // Export the Sequelize library

export default db;