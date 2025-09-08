// n8n workflow configuration
export const n8nConfig = {
  // Replace with your n8n webhook URL
  webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL || 'YOUR_N8N_WEBHOOK_URL',
  
  // Timeout for API calls in milliseconds
  timeout: 10000,
  
  // Default headers
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
};

// Stock market specific configuration
export const stockConfig = {
  // Default market data
  defaultMarket: 'NSE',
  
  // Supported markets
  supportedMarkets: ['NSE', 'BSE'],
  
  // Default stock symbols to show in suggestions
  defaultStocks: [
    { symbol: 'RELIANCE', name: 'Reliance Industries', exchange: 'NSE' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', exchange: 'NSE' },
    { symbol: 'INFY', name: 'Infosys', exchange: 'NSE' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', exchange: 'NSE' },
  ],
  
  // Market hours in IST
  marketHours: {
    open: '09:15',
    close: '15:30',
    timezone: 'Asia/Kolkata'
  }
};
