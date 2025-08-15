import { Card, Text, TextField } from "@shopify/polaris"
import React, { memo, useEffect, useRef, useState } from "react"

interface SearchBoxProps {
  onSearchChange?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  initialSearchTerm?: string
}

const SearchBox: React.FC<SearchBoxProps> = memo(({ onSearchChange, onClear, placeholder = "輸入加密貨幣名稱或符號", initialSearchTerm = "" }) => {
  // Use ref to store the previous search value
  const previousSearchTermRef = useRef(initialSearchTerm)

  // When using useState, prioritize the stored value over initialSearchTerm
  const [searchTerm, setSearchTerm] = useState(() => {
    return previousSearchTermRef.current || initialSearchTerm
  })

  // Update the previous search value
  useEffect(() => {
    previousSearchTermRef.current = searchTerm
  }, [searchTerm])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    onSearchChange?.(value)
  }

  const handleClear = () => {
    setSearchTerm("")
    onClear?.()
    onSearchChange?.("")
  }

  return (
    <Card>
      <Text variant="headingMd" as="h2">
        搜尋加密貨幣
      </Text>
      <TextField label="搜尋" value={searchTerm} onChange={handleSearchChange} placeholder={placeholder} autoComplete="off" onClearButtonClick={handleClear} />
    </Card>
  )
})

export default SearchBox
