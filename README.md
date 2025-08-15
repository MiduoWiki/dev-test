# 加密貨幣報價應用

這是一個顯示加密貨幣報價的應用程式，前端使用 React + TypeScript + Vite，後端使用 Node.js + Express + MySQL。

## 功能特色

- 顯示熱門加密貨幣的即時報價
- 支援按名稱或符號搜尋加密貨幣
- 支援按價格變動排序
- 數據每5分鐘自動更新一次

## 運行方式

### 前端

```bash
npm run dev
```

### 後端

```bash
npm run dev
```

### 啟動模擬服務

```bash
cd backend/mocks && node server.js
```

## 備註

由於加密貨幣 API 需要收費，目前功能是使用模擬數據實現的。在開發環境中，應用會從模擬服務獲取數據而不是真實的 CoinGecko API。