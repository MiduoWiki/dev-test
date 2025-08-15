import { Model, Sequelize } from 'sequelize';
export interface CryptocurrencyAttributes {
    id: string;
    name: string;
    symbol: string;
    price: string;
    change_24h: string;
    market_cap: string;
    volume_24h: string;
    last_updated: Date;
}
declare class Cryptocurrency extends Model<CryptocurrencyAttributes> implements CryptocurrencyAttributes {
    id: string;
    name: string;
    symbol: string;
    price: string;
    change_24h: string;
    market_cap: string;
    volume_24h: string;
    last_updated: Date;
}
export declare const initCryptocurrencyModel: (sequelize: Sequelize) => void;
export default Cryptocurrency;
//# sourceMappingURL=Cryptocurrency.d.ts.map