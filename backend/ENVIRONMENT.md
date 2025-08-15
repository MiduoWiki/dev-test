# Environment Configuration

This project supports multiple environment configurations for development and production.

## Environment Files

- `.env.development`: Configuration for the development environment
- `.env.production`: Configuration for the production environment

## Environment Variables

Both environment files contain the following variables:

- `PORT`: The port the server will run on
- `MYSQL_HOST`: MySQL database host
- `MYSQL_PORT`: MySQL database port
- `MYSQL_USERNAME`: MySQL database username
- `MYSQL_PASSWORD`: MySQL database password
- `MYSQL_DATABASE`: MySQL database name
- `NODE_ENV`: The current environment (development or production)
- `USE_MOCK`: Whether to use the mock server for CoinGecko API

## NPM Scripts

The following npm scripts are available to run the application in different environments:

### Development

- `npm run dev:development`: Run the application in development mode with hot reloading
- `npm start:development`: Run the built application in development mode

### Production

- `npm run dev:production`: Run the application in production mode with hot reloading
- `npm start:production`: Run the built application in production mode

### Default Scripts

- `npm run dev`: Run the application in default mode (uses ts-node directly)
- `npm start`: Run the built application in default mode

## Usage

To run the application in a specific environment:

```bash
# Development mode with hot reloading
npm run dev:development

# Production mode with hot reloading
npm run dev:production

# Build the application
npm run build

# Run built application in development mode
npm start:development

# Run built application in production mode
npm start:production
```

The application will automatically load the appropriate environment variables based on the script used.