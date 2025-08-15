import { Sequelize } from 'sequelize';
import { CoinGeckoApiResponse } from '../types/coingecko.types';
declare let sequelize: Sequelize | null;
declare const syncDataToDatabase: () => Promise<CoinGeckoApiResponse | void>;
declare const scheduleSyncTask: () => void;
export { sequelize, scheduleSyncTask, syncDataToDatabase };
//# sourceMappingURL=cryptocurrencySyncService.d.ts.map