import cors from 'cors';
import express, { Application } from 'express';
import cryptocurrencyRoutes from './routes/cryptocurrencyRoutes';
import { scheduleSyncTask, sequelize } from './services/cryptocurrencySyncService';

// Load environment variables based on NODE_ENV
require('../env-loader');

// Initialize database connection
if (sequelize) {
  sequelize.sync()
    .then(() => console.log('Connected to MySQL database'))
    .catch((err: Error) => console.error('MySQL connection error:', err));
} else {
  console.log('Database not configured, skipping database connection.');
}

// Create Express app
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cryptocurrencies', cryptocurrencyRoutes);
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.send('Cryptocurrency Quotation API is running!');
});

// Add logging for all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Start the data synchronization scheduler
  scheduleSyncTask();
});