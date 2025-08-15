export interface CoinGeckoCoin {
    id: string;
    name: string;
    symbol: string;
    data: {
        price: string;
        price_btc: string;
        price_change_percentage_24h: {
            usd: number;
        };
        market_cap: string;
        total_volume: string;
    };
}
export interface CoinGeckoCoinItem {
    item: CoinGeckoCoin;
}
export interface CoinGeckoApiResponse {
    coins: CoinGeckoCoinItem[];
}
//# sourceMappingURL=coingecko.types.d.ts.map