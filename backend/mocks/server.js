const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Load mock data
const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, 'coingecko-trending.json'), 'utf8'));

// Mock endpoint for CoinGecko trending API
app.get('/api/v3/search/trending', (req, res) => {
  console.log('Mock CoinGecko API hit');
  res.json(mockData);
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock CoinGecko server running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/v3/search/trending`);
});