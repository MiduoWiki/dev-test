"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cryptocurrencyController_1 = require("../controllers/cryptocurrencyController");
const router = express_1.default.Router();
router.get('/', cryptocurrencyController_1.getCryptocurrencies);
router.get('/search', cryptocurrencyController_1.searchCryptocurrencies);
router.get('/:id', cryptocurrencyController_1.getCryptocurrencyById);
exports.default = router;
//# sourceMappingURL=cryptocurrencyRoutes.js.map