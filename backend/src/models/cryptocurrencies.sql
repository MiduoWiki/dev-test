CREATE DATABASE IF NOT EXISTS crypto_quotation;

USE crypto_quotation;

CREATE TABLE `cryptocurrencies` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `symbol` varchar(50) NOT NULL,
  `price` varchar(255) NOT NULL,
  `change_24h` varchar(255) NOT NULL,
  `market_cap` varchar(255) NOT NULL,
  `volume_24h` varchar(255) NOT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`),
  KEY `idx_symbol` (`symbol`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 备注：- 查询条件包含 name 和 symbol 时可以使用索引
-- 查询条件只包含 name 时可以使用索引
-- 查询条件只包含 symbol 时不能有效使用索引（不符合最左原则）
