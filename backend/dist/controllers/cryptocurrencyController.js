"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCryptocurrencies = exports.getCryptocurrencyById = exports.getCryptocurrencies = void 0;
const Cryptocurrency_1 = __importDefault(require("../models/Cryptocurrency"));
const getCryptocurrencies = async (req, res) => {
    try {
        const cryptocurrencies = await Cryptocurrency_1.default.findAll();
        res.json(cryptocurrencies);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching cryptocurrencies', error });
    }
};
exports.getCryptocurrencies = getCryptocurrencies;
const getCryptocurrencyById = async (req, res) => {
    try {
        const { id } = req.params;
        const cryptocurrency = await Cryptocurrency_1.default.findByPk(id);
        if (cryptocurrency) {
            res.json(cryptocurrency);
        }
        else {
            res.status(404).json({ message: 'Cryptocurrency not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching cryptocurrency', error });
    }
};
exports.getCryptocurrencyById = getCryptocurrencyById;
const searchCryptocurrencies = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            const cryptocurrencies = await Cryptocurrency_1.default.findAll();
            res.json(cryptocurrencies);
            return;
        }
        const searchTerm = query.toString().toLowerCase();
        const results = await Cryptocurrency_1.default.findAll({
            where: {
                [require('sequelize').Op.or]: [
                    { name: { [require('sequelize').Op.like]: `%${searchTerm}%` } },
                    { symbol: { [require('sequelize').Op.like]: `%${searchTerm}%` } }
                ]
            }
        });
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ message: 'Error searching cryptocurrencies', error });
    }
};
exports.searchCryptocurrencies = searchCryptocurrencies;
//# sourceMappingURL=cryptocurrencyController.js.map