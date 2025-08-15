import { Badge, DataTable } from "@shopify/polaris"
import React from "react"
import type { Cryptocurrency } from "../types/cryptoList"

interface CryptoListProps {
  cryptocurrencies: Cryptocurrency[]
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptocurrencies }) => {
  const rows = cryptocurrencies.map((crypto) => [
    crypto.name || "",
    crypto.symbol || "",
    crypto.price,
    <Badge tone={+crypto.change_24h >= 0 ? "success" : "critical"} key={`${crypto.id}-badge`}>
      {crypto.change_24h}
    </Badge>,
    crypto.market_cap,
    crypto.volume_24h,
  ])

  return (
    <DataTable
      columnContentTypes={["text", "text", "text", "text", "text", "text"]}
      headings={["名稱", "符號", "價格", "24小時價格變化", "市值", "24小時成交量"]}
      rows={rows}
      sortable={[false, false, false, false, false, false]}
    />
  )
}

export default CryptoList
