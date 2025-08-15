# Mock CoinGecko API Server

This directory contains a mock server for the CoinGecko API v3 trending endpoint. It's useful for development and testing purposes.

## Files

- `coingecko-trending.json`: Contains mock data that mimics the response from `https://api.coingecko.com/api/v3/search/trending`
- `server.js`: A simple Express server that serves the mock data

## How to Use

1. Install dependencies (if not already installed):
   ```bash
   npm install express
   ```

2. Start the mock server:
   ```bash
   node mocks/server.js
   ```

3. The server will start on port 3001 and provide the mock API at:
   ```
   http://localhost:3001/api/v3/search/trending
   ```

## Using with the Main Application

To use the mock server with the main application:

1. Start the mock server as described above
2. Set the following environment variables in your `.env` file:
   ```
   NODE_ENV=development
   USE_MOCK=true
   ```
3. Start your main application

When these environment variables are set, the application will use the mock server instead of the real CoinGecko API.