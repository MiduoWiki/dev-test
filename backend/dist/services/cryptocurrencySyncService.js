"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDataToDatabase = exports.scheduleSyncTask = exports.sequelize = void 0;
const axios_1 = __importDefault(require("axios"));
const node_cron_1 = __importDefault(require("node-cron"));
const sequelize_1 = require("sequelize");
const Cryptocurrency_1 = __importStar(require("../models/Cryptocurrency"));
const USE_MOCK = process.env.USE_MOCK === 'true';
let sequelize = null;
exports.sequelize = sequelize;
if (!USE_MOCK) {
    const MYSQL_HOST = process.env.MYSQL_HOST || '127.0.0.1';
    const MYSQL_PORT = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306;
    const MYSQL_USERNAME = process.env.MYSQL_USERNAME || 'root';
    const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
    const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'crypto_quotation';
    exports.sequelize = sequelize = new sequelize_1.Sequelize(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, {
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        dialect: 'mysql',
        logging: false,
    });
    (0, Cryptocurrency_1.initCryptocurrencyModel)(sequelize);
}
const fetchCryptocurrencyData = async () => {
    try {
        const apiUrl = process.env.NODE_ENV === 'development' && process.env.USE_MOCK === 'true'
            ? 'http://localhost:3001/api/v3/search/trending'
            : 'https://api.coingecko.com/api/v3/search/trending';
        const response = await axios_1.default.get(apiUrl);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching data from CoinGecko API:', error);
        throw error;
    }
};
const syncDataToDatabase = async () => {
    try {
        console.log('Starting data synchronization...');
        const apiData = await fetchCryptocurrencyData();
        if (!USE_MOCK && sequelize) {
            for (const coin of apiData.coins) {
                const coinData = coin.item;
                await Cryptocurrency_1.default.upsert({
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
        }
        else {
            console.log('Using mock data, skipping database synchronization.');
        }
    }
    catch (error) {
        console.error('Error during data synchronization:', error);
    }
};
exports.syncDataToDatabase = syncDataToDatabase;
const scheduleSyncTask = () => {
    node_cron_1.default.schedule('*/1 * * * *', async () => {
        console.log('Running scheduled data synchronization...');
        await syncDataToDatabase();
    });
    console.log('Data synchronization scheduled to run every 5 minutes.');
};
exports.scheduleSyncTask = scheduleSyncTask;
if (!USE_MOCK) {
    syncDataToDatabase();
}
//# sourceMappingURL=cryptocurrencySyncService.js.map