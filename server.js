// server.js
import 'dotenv/config'; 
import { createServer } from './app.js';
// 1. Import the database/models object (which holds the sequelize instance)
import db from './models/index.js'; 

// ... other imports
// import './src/models/associations.js'; // Keep this if you have defined associations

const connectDB = async () => {
  try {
    // 2. Use the authenticate method from the imported sequelize instance
    await db.sequelize.authenticate();
    console.log('✅ PostgreSQL database connected successfully!');
    
    // 3. Sync models with the database
    // force: false ensures tables aren't dropped.
    // alter: true attempts to apply schema changes without dropping/recreating.
    await db.sequelize.sync({ force: false, alter: true, });
  } catch (error) {
    console.error('❌ Unable to connect or sync database:', error);
    // Optionally exit the process if the database connection is critical
    // process.exit(1); 
  }
};

connectDB(); // Execute the connection function

const server = createServer();
const port = process.env.PORT;

// Start server AFTER attempting to connect to the database
server.listen(port, () => {
  console.log(`🚀 API running on http://localhost:${port}`);
});