import { Card, Layout, Page, Text } from "@shopify/polaris"
import "@shopify/polaris/build/esm/styles.css"
import { useEffect, useState } from "react"
import "./App.css"
import { cryptocurrencyApi } from "./api/cryptocurrencyApi"
import CryptoList from "./components/CryptoList"
import ErrorBanner from "./components/ErrorBanner"
import LoadingSkeleton from "./components/LoadingSkeleton"
import SearchBox from "./components/SearchBox"
import { useApi } from "./hooks/useApi"
import type { Cryptocurrency } from "./types/cryptoList"
import { debounce } from "./utils/debounce"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const { data: cryptocurrencies, loading, error, setError, fetchData } = useApi<Cryptocurrency>()

  useEffect(() => {
    fetchData(cryptocurrencyApi.getAll())
  }, [])

  // Create a debounced version of fetchData, but not used for initial loading
  const debouncedFetchData = debounce((searchValue?: string) => {
    const url = searchValue ? cryptocurrencyApi.search(searchValue) : cryptocurrencyApi.getAll()
    fetchData(url)
  }, 500)

  const handleSearch = (searchValue: string) => {
    debouncedFetchData(searchValue)
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorBanner error={error} onDismiss={() => setError(null)} />
  }

  return (
    <Page title="加密貨幣報價">
      <Layout>
        <Layout.Section>
          <SearchBox
            placeholder="搜尋加密貨幣名稱或符號"
            searchTerm={searchTerm}
            onSearchChange={(value) => {
              setSearchTerm(value)
              handleSearch(value)
            }}
          />
        </Layout.Section>

        <Layout.Section>
          <Card>
            <CryptoList cryptocurrencies={cryptocurrencies} />
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Text variant="bodyMd" as="p">
              數據更新時間:{" "}
              <Text as="span" tone="subdued">
                {new Date().toLocaleString()}
              </Text>
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default App
