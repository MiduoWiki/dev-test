import express, { Router } from 'express';
import { 
  getCryptocurrencies, 
  getCryptocurrencyById, 
  searchCryptocurrencies 
} from '../controllers/cryptocurrencyController';

const router: Router = express.Router();

// GET /api/cryptocurrencies - Get all cryptocurrencies
router.get('/', getCryptocurrencies);

// GET /api/cryptocurrencies/search - Search cryptocurrencies
router.get('/search', searchCryptocurrencies);

// GET /api/cryptocurrencies/:id - Get a specific cryptocurrency by ID
router.get('/:id', getCryptocurrencyById);

export default router;