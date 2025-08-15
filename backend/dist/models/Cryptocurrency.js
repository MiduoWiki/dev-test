"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCryptocurrencyModel = void 0;
const sequelize_1 = require("sequelize");
class Cryptocurrency extends sequelize_1.Model {
}
const initCryptocurrencyModel = (sequelize) => {
    Cryptocurrency.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        symbol: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        change_24h: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        market_cap: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        volume_24h: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        last_updated: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'Cryptocurrency',
        tableName: 'cryptocurrencies',
        timestamps: false,
    });
};
exports.initCryptocurrencyModel = initCryptocurrencyModel;
exports.default = Cryptocurrency;
//# sourceMappingURL=Cryptocurrency.js.map