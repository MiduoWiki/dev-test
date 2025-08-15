import axios from 'axios';
import cron from 'node-cron';
import { Sequelize } from 'sequelize';
import Cryptocurrency, { initCryptocurrencyModel } from '../models/Cryptocurrency';
import { CoinGeckoApiResponse } from '../types/coingecko.types';

// Check if we should use mock data
const USE_MOCK = process.env.USE_MOCK === 'true';

// MySQL connection
let sequelize: Sequelize | null = null;

const MYSQL_HOST = process.env.MYSQL_HOST || '127.0.0.1';
const MYSQL_PORT = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '123456';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'crypto_quotation';

// Connect to MySQL
sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
  logging: false,
});

// Initialize the Cryptocurrency model
initCryptocurrencyModel(sequelize);

// Function to fetch data from CoinGecko API
const fetchCryptocurrencyData = async (): Promise<CoinGeckoApiResponse> => {
  try {
    // Use mock server in development environment
    const apiUrl = process.env.NODE_ENV === 'development' && process.env.USE_MOCK === 'true' 
      ? 'http://localhost:3001/api/v3/search/trending' 
      : 'https://api.coingecko.com/api/v3/search/trending';
    
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from CoinGecko API:', error);
    throw error;
  }
};

// Function to sync data to MySQL
const syncDataToDatabase = async (): Promise<CoinGeckoApiResponse | void> => {
  try {
    console.log('Starting data synchronization...');
    
    // Fetch data from CoinGecko API
    const apiData = await fetchCryptocurrencyData();
    
    // Only save to database if not using mock data
    if (!USE_MOCK && sequelize) {
      // Process and save each cryptocurrency
      for (const coin of apiData.coins) {
        const coinData = coin.item;
        
        await Cryptocurrency.upsert({
          id: coinData.id.toString(),
          name: coinData.name,
          symbol: coinData.symbol,
          price: coinData.data.price,
          change_24h: coinData.data.price_change_percentage_24h.usd.toString(),
          market_cap: coinData.data.market_cap,
          volume_24h: coinData.data.total_volume,
          last_updated: new Date(),
        });
      }
      
      console.log('Data synchronization completed successfully.');
    } else {
      console.log('Using mock data, skipping database synchronization.');
    }
  } catch (error) {
    console.error('Error during data synchronization:', error);
  }
};

// Schedule the sync task to run every 5 minutes
const scheduleSyncTask = (): void => {
  cron.schedule('*/1 * * * *', async () => {
    console.log('Running scheduled data synchronization...');
    await syncDataToDatabase();
  });
  
  console.log('Data synchronization scheduled to run every 5 minutes.');
};

// Initial sync
if (!USE_MOCK) {
  syncDataToDatabase();
}

// Export sequelize instance and functions
export { sequelize, scheduleSyncTask, syncDataToDatabase };
