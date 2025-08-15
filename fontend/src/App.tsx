import { Card, Layout, Page, Text } from "@shopify/polaris"
import "@shopify/polaris/build/esm/styles.css"
import { useState, useMemo } from "react"
import "./App.css"
import CryptoList from "./components/CryptoList"
import SearchBox from "./components/SearchBox"
import type { Cryptocurrency } from "./types/cryptoList"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cryptoData, setCryptoData] = useState<Cryptocurrency[]>([])

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
  }

  const lastUpdated = useMemo(() => {
    if (cryptoData && cryptoData.length > 0 && cryptoData[0].last_updated) {
      return new Date(cryptoData[0].last_updated).toLocaleString()
    }
    return ""
  }, [cryptoData])

  return (
    <Page title="加密貨幣報價">
      <Layout>
        <Layout.Section>
          <SearchBox 
            placeholder="搜尋加密貨幣名稱或符號" 
            onSearchChange={handleSearch}
          />
        </Layout.Section>

        <Layout.Section>
          <Card>
            <CryptoList searchValue={searchTerm} onDataChange={setCryptoData} />
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Text variant="bodyMd" as="p">
              數據更新時間: <Text as="span" tone="subdued">{lastUpdated || "加載中..."}</Text>
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default App
