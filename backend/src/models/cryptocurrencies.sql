CREATE DATABASE IF NOT EXISTS crypto_quotation;

USE crypto_quotation;

CREATE TABLE `cryptocurrencies` (
  `id` varchar(255) NOT NULL x,
  `name` varchar(255) NOT NULL,
  `symbol` varchar(50) NOT NULL,
  `price` varchar(255) NOT NULL,
  `change_24h` varchar(255) NOT NULL,
  `market_cap` varchar(255) NOT NULL,
  `volume_24h` varchar(255) NOT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
