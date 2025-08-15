import { Request, Response } from 'express';
import Cryptocurrency from '../models/Cryptocurrency';
import xss from 'xss';

// Get all cryptocurrencies
export const getCryptocurrencies = async (req: Request, res: Response): Promise<void> => {
    try {
    const cryptocurrencies = await Cryptocurrency.findAll();
    res.json(cryptocurrencies);
  } catch (error) {
      console.log('error', error)
    res.status(500).json({ message: 'Error fetching cryptocurrencies', error });
    }
};

// Get a specific cryptocurrency by id
export const getCryptocurrencyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const cryptocurrency = await Cryptocurrency.findByPk(id);
    
    if (cryptocurrency) {
      res.json(cryptocurrency);
    } else {
      res.status(404).json({ message: 'Cryptocurrency not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cryptocurrency', error });
  }
};

// Search cryptocurrencies by name or symbol
export const searchCryptocurrencies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query;
    
    if (!query) {
      const cryptocurrencies = await Cryptocurrency.findAll();
      res.json(cryptocurrencies);
      return;
    }
    
    // XSS filtering
    const sanitizedQuery = xss(query.toString());
    const searchTerm = sanitizedQuery.toLowerCase();
    
    const sequelize = require('sequelize');
    const results = await Cryptocurrency.findAll({
      where: {
        [sequelize.Op.or]: [
          { name: { [sequelize.Op.like]: `%${searchTerm}%` } },
          { symbol: { [sequelize.Op.like]: `%${searchTerm}%` } }
        ]
      }
    });
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching cryptocurrencies', error });
  }
};