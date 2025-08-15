import { Card, Layout, Page, Text } from "@shopify/polaris"
import "@shopify/polaris/build/esm/styles.css"
import { useState, useMemo } from "react"
import "./App.css"
import CryptoList from "./components/CryptoList"
import SearchBox from "./components/SearchBox"

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
  }

  const lastUpdated = useMemo(() => new Date().toLocaleString(), [])

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
            <CryptoList searchValue={searchTerm} />
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Text variant="bodyMd" as="p">
              數據更新時間: <Text as="span" tone="subdued">{lastUpdated}</Text>
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default App
