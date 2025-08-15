export interface Cryptocurrency {
  id: string
  name: string
  symbol: string
  price: string // 價格
  change_24h: string // 24小時價格變化
  market_cap: string // 市值
  volume_24h: string // 24小時成交量
}
