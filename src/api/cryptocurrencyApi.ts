const API_BASE_URL = 'http://localhost:3000/api';

export const cryptocurrencyApi = {
  getAll: () => `${API_BASE_URL}/cryptocurrencies`,
  search: (query: string) => `${API_BASE_URL}/cryptocurrencies/search?query=${encodeURIComponent(query)}`,
};

