import { Badge, DataTable, type TableData } from "@shopify/polaris"
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cryptocurrencyApi } from "../api/cryptocurrencyApi"
import { useApi } from "../hooks/useApi"
import type { Cryptocurrency } from "../types/cryptoList"
import { debounce } from "../utils/debounce"
import ErrorBanner from "./ErrorBanner"
import LoadingSkeleton from "./LoadingSkeleton"

interface CryptoListProps {
  searchValue?: string
  onDataChange?: (data: Cryptocurrency[]) => void
}

const CryptoList: React.FC<CryptoListProps> = memo(({ searchValue, onDataChange }) => {
  const { data: cryptocurrencies, loading, error, setError, fetchData } = useApi<Cryptocurrency>()
  const [sortedRows, setSortedRows] = useState<TableData[][] | null>(null)
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('descending')
  const [sortColumnIndex, setSortColumnIndex] = useState<number>(4)

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

  useEffect(() => {
    // 将数据传递回父组件
    onDataChange?.(cryptocurrencies)
  }, [cryptocurrencies, onDataChange])

  const initiallySortedRows = useMemo(() => cryptocurrencies.map((crypto) => [
    crypto.name || "",
    crypto.symbol || "",
    crypto.price,
    <Badge tone={+crypto.change_24h >= 0 ? "success" : "critical"} key={`${crypto.id}-badge`}>
      {crypto.change_24h}
    </Badge>,
    crypto.market_cap,
    crypto.volume_24h,
  ]), [cryptocurrencies])
  
  const rows = sortedRows ? sortedRows : initiallySortedRows

  const handleSort = useCallback(
    (index: number, direction: 'ascending' | 'descending') => {
      setSortDirection(direction)
      setSortColumnIndex(index)
      setSortedRows(sortMarketCap(rows, index, direction))
    },
    [rows]
  )

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
      sortable={[false, false, false, false, true, false]}
      onSort={handleSort}
      defaultSortDirection={sortDirection}
      initialSortColumnIndex={sortColumnIndex}
    />
  )
})

  function sortMarketCap(
    rows: TableData[][],
    index: number,
    direction: 'ascending' | 'descending',
  ): TableData[][] {
    return [...rows].sort((rowA, rowB) => {
      // 移除货币符号和逗号，然后转换为数字进行比较
      const amountA = parseFloat((rowA[index] || '0').toString().replace(/[^0-9.-]+/g, ""))
      const amountB = parseFloat((rowB[index] || '0').toString().replace(/[^0-9.-]+/g, ""))

      return direction === 'descending' ? amountB - amountA : amountA - amountB;
    });
  }

export default CryptoList
