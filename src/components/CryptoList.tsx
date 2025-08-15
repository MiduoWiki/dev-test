import { Badge, DataTable } from "@shopify/polaris"
import React, { memo, useCallback, useEffect, useRef } from "react"
import { cryptocurrencyApi } from "../api/cryptocurrencyApi"
import { useApi } from "../hooks/useApi"
import type { Cryptocurrency } from "../types/cryptoList"
import { debounce } from "../utils/debounce"
import ErrorBanner from "./ErrorBanner"
import LoadingSkeleton from "./LoadingSkeleton"

interface CryptoListProps {
  searchValue?: string
}

const CryptoList: React.FC<CryptoListProps> = memo(({ searchValue }) => {
  const { data: cryptocurrencies, loading, error, setError, fetchData } = useApi<Cryptocurrency>()

  const fetchDataWithUrl = useCallback(
    (searchValue?: string) => {
      const url = searchValue ? cryptocurrencyApi.search(searchValue) : cryptocurrencyApi.getAll()
      fetchData(url)
    },
    [fetchData]
  )

  const debouncedFetchDataRef = useRef(debounce(fetchDataWithUrl, 500))

  useEffect(() => {
    debouncedFetchDataRef.current(searchValue)
  }, [searchValue])

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

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorBanner error={error} onDismiss={() => setError(null)} />
  }

  return (
    <DataTable
      columnContentTypes={["text", "text", "text", "text", "text", "text"]}
      headings={["名稱", "符號", "價格", "24小時價格變化", "市值", "24小時成交量"]}
      rows={rows}
      sortable={[false, false, false, false, false, false]}
    />
  )
})

export default CryptoList
