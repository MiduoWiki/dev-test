import { Banner, Page } from "@shopify/polaris"
import React from "react"

interface ErrorBannerProps {
  error: string | null
  onDismiss: () => void
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ error, onDismiss }) => {
  return (
    <Page title="加密貨幣報價">
      <Banner title="數據加載失敗" tone="critical" onDismiss={onDismiss}>
        <p>{error}</p>
      </Banner>
    </Page>
  )
}

export default ErrorBanner