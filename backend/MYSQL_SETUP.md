# MySQL Setup Guide

## Initial Setup

1. Install MySQL on your system if not already installed.

2. Start MySQL service:
   - On macOS: `brew services start mysql`
   - On Linux: `sudo service mysql start`
   - On Windows: Start the MySQL service from Services

3. Secure your MySQL installation (optional but recommended):
   ```bash
   mysql_secure_installation
   ```

## Setting up the Database and User

1. Connect to MySQL as root:
   ```bash
   mysql -u root -p
   ```

2. Create the database:
   ```sql
   CREATE DATABASE crypto_quotation;
   ```

3. Create a dedicated user for the application (optional but recommended):
   ```sql
   CREATE USER 'crypto_user'@'localhost' IDENTIFIED BY 'your_password_here';
   ```

4. Grant privileges to the user:
   ```sql
   GRANT ALL PRIVILEGES ON crypto_quotation.* TO 'crypto_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

5. Exit MySQL:
   ```sql
   EXIT;
   ```

## Environment Configuration

Update your `.env` file with the correct MySQL configuration:

```
PORT=3000
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USERNAME=crypto_user  # or root if using root user
MYSQL_PASSWORD=your_password_here
MYSQL_DATABASE=crypto_quotation
```

## Common Issues and Solutions

### 1. Access denied for user 'root'@'localhost' (using password: NO)

This error occurs when MySQL requires a password for the root user, but none is provided.

Solution:
- Ensure `MYSQL_PASSWORD` is set in your `.env` file
- If you haven't set a password for MySQL root user, you can set one by running:
  ```bash
  mysql -u root
  ```
  Then in the MySQL shell:
  ```sql
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
  EXIT;
  ```

### 2. Access denied for user 'root'@'localhost' (using password: YES)

This error occurs when the provided password is incorrect.

Solution:
- Double-check the `MYSQL_PASSWORD` in your `.env` file
- Verify the password by connecting to MySQL manually:
  ```bash
  mysql -u root -p
  ```

### 3. Can't connect to MySQL server on '127.0.0.1' (111)

This error occurs when the MySQL server is not running.

Solution:
- Start the MySQL service on your system
- Verify that MySQL is running on the correct port (default is 3306)

### 4. Environment variables not loaded when running node directly

This issue occurs when running the compiled JavaScript files directly with node, as the dotenv configuration in server.ts is not executed.

Solution:
- Use the provided start script: `npm start`
- Or run node with the environment loader: `node -r ./env-loader.js dist/server.js`

## Creating the Table

Run the following SQL script to create the cryptocurrencies table:

```sql
USE crypto_quotation;

CREATE TABLE IF NOT EXISTS cryptocurrencies (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  symbol VARCHAR(50) NOT NULL,
  price DECIMAL(20, 8) NOT NULL,
  change24h DECIMAL(10, 2) NOT NULL,
  marketCap DECIMAL(25, 8) NOT NULL,
  volume24h DECIMAL(25, 8) NOT NULL,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```