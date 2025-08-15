import { Card, Layout, SkeletonBodyText, SkeletonPage } from "@shopify/polaris"
import React from "react"

const LoadingSkeleton: React.FC = () => {
  return (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <Card>
            <SkeletonBodyText lines={1} />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <SkeletonBodyText lines={10} />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  )
}

export default LoadingSkeleton