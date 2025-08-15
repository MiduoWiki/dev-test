import { Card, Text, TextField } from "@shopify/polaris"
import React from "react"

interface SearchBoxProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onClear?: () => void
  placeholder?: string
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchTerm, onSearchChange, onClear, placeholder = "輸入加密貨幣名稱或符號" }) => {
  return (
    <Card>
      <Text variant="headingMd" as="h2">
        搜尋加密貨幣
      </Text>
      <TextField label="搜尋" value={searchTerm} onChange={onSearchChange} placeholder={placeholder} autoComplete="off" onClearButtonClick={onClear} />
    </Card>
  )
}

export default SearchBox
