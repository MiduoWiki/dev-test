"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cryptocurrencyRoutes_1 = __importDefault(require("./routes/cryptocurrencyRoutes"));
const cryptocurrencySyncService_1 = require("./services/cryptocurrencySyncService");
dotenv_1.default.config();
if (process.env.USE_MOCK !== 'true' && cryptocurrencySyncService_1.sequelize) {
    cryptocurrencySyncService_1.sequelize.sync()
        .then(() => console.log('Connected to MySQL database'))
        .catch((err) => console.error('MySQL connection error:', err));
}
else {
    console.log('Using mock data, skipping database connection.');
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/cryptocurrencies', cryptocurrencyRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Cryptocurrency Quotation API is running!');
});
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    (0, cryptocurrencySyncService_1.scheduleSyncTask)();
});
//# sourceMappingURL=server.js.map