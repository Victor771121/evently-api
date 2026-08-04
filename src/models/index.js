// src/models/index.js

import { Sequelize } from 'sequelize';
import config from '../config/config.json' with { type: 'json' };
import userModel from './user.model.js'; // Import the model FUNCTION
import eventModel from './event.model.js'; // Import the model FUNCTION
import ticketModel from './ticket.model.js'; // Import the model FUNCTION
import cartModel from './cart.model.js';

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
db.Event = eventModel(sequelize, Sequelize.DataTypes);
db.Ticket = ticketModel(sequelize, Sequelize.DataTypes);
db.Cart = cartModel(sequelize, Sequelize.DataTypes);

// 4. Set up associations
Object.values(db).forEach((model) => {
  if (model && typeof model.associate === 'function') {
    model.associate(db);
  }
});

db.sequelize = sequelize; // Export the instance itself
db.Sequelize = Sequelize; // Export the Sequelize library

export default db;