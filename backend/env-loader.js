// Load environment variables based on NODE_ENV or default to development
const path = require('path');
const dotenv = require('dotenv');

// Determine which env file to load
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.development';
const envPath = path.resolve(process.cwd(), envFile);

dotenv.config({ path: envPath });

// Re-export all environment variables
module.exports = process.env;