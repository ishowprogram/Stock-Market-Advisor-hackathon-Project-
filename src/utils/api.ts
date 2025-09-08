export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  high52Week: number;
  low52Week: number;
  chartData: ChartPoint[];
  recommendation: 'Buy' | 'Hold' | 'Sell';
  recommendationReason: string;
}

export interface ChartPoint {
  timestamp: string;
  price: number;
  volume: number;
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'received' | 'error';
  isTyping?: boolean;
  error?: string;
}

// Mock stock data generator
export const getStockData = async (ticker: string): Promise<StockData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Indian stock prices - adjust based on common NSE/BSE ranges
  const indianStocks = {
    'RELIANCE': { basePrice: 2800, range: 200 },
    'TCS': { basePrice: 3500, range: 300 },
    'INFY': { basePrice: 1800, range: 150 },
    'HDFCBANK': { basePrice: 1600, range: 100 },
    'ICICIBANK': { basePrice: 1200, range: 80 },
    'SBIN': { basePrice: 800, range: 50 },
    'ITC': { basePrice: 450, range: 30 },
    'HINDUNILVR': { basePrice: 2400, range: 200 },
    'BHARTIARTL': { basePrice: 1500, range: 100 },
    'KOTAKBANK': { basePrice: 1700, range: 120 }
  };
  
  const stockInfo = indianStocks[ticker as keyof typeof indianStocks] || { basePrice: Math.random() * 2000 + 100, range: 100 };
  const basePrice = stockInfo.basePrice + (Math.random() - 0.5) * stockInfo.range;
  const change = (Math.random() - 0.5) * 20;
  const changePercent = (change / basePrice) * 100;
  
  // Generate mock chart data for the last 30 days
  const chartData: ChartPoint[] = [];
  let currentPrice = basePrice;
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    currentPrice += (Math.random() - 0.5) * 5;
    currentPrice = Math.max(currentPrice, 10); // Prevent negative prices
    
    chartData.push({
      timestamp: date.toISOString().split('T')[0],
      price: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 1000000
    });
  }
  
  // Final price adjustment
  const finalPrice = basePrice + change;
  
  const recommendations = ['Buy', 'Hold', 'Sell'] as const;
  const recommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
  
  const reasons = {
    Buy: 'Strong Q3 results with robust revenue growth. FII inflows in this sector and technical breakout above key resistance levels indicate bullish momentum. Good fundamentals with expanding market share in Indian markets.',
    Hold: 'Decent fundamentals but trading at fair valuations. Await Union Budget announcements and RBI monetary policy decisions. Sector rotation may impact near-term performance.',
    Sell: 'Expensive valuations at current levels with heavy DII profit booking. Consider partial profit booking as stock approaches overbought territory. Better entry points expected post-correction.'
  };

  return {
    symbol: ticker.toUpperCase(),
    price: Number(finalPrice.toFixed(2)),
    change: Number(change.toFixed(2)),
    changePercent: Number(changePercent.toFixed(2)),
    volume: Math.floor(Math.random() * 50000000) + 5000000,
    marketCap: `₹${(Math.random() * 500 + 50).toFixed(1)}K Cr`,
    high52Week: Number((finalPrice * 1.3).toFixed(2)),
    low52Week: Number((finalPrice * 0.7).toFixed(2)),
    chartData,
    recommendation,
    recommendationReason: reasons[recommendation]
  };
};

import { n8nConfig } from '../config/n8n';

interface N8NResponse {
  response?: string;
  error?: string;
  data?: any;
  timestamp: string;
}

export const askBot = async (message: string): Promise<string> => {
  // Simulate typing delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), n8nConfig.timeout);
    
    const response = await fetch(n8nConfig.webhookUrl, {
      method: 'POST',
      headers: n8nConfig.headers,
      body: JSON.stringify({ 
        message,
        context: {
          platform: 'web',
          locale: 'en-IN',
          timezone: 'Asia/Kolkata',
          timestamp: new Date().toISOString(),
          version: import.meta.env.VITE_APP_VERSION || '1.0.0'
        }
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        (errorData as { message?: string })?.message || `API request failed with status ${response.status}`
      );
    }
    
    const data: N8NResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    // Handle different response formats
    if (data.response) {
      return data.response;
    } else if (data.data?.choices?.[0]?.message?.content) {
      // Handle OpenAI format
      return data.data.choices[0].message.content;
    } else if (data.data?.text) {
      // Handle simple text response
      return data.data.text;
    } else if (typeof data === 'string') {
      return data; // Direct string response
    }
    
    throw new Error('Unexpected response format from n8n workflow');
    
  } catch (error: unknown) {
    console.error('Error in askBot:', error);
    
    // Check for specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return "The request took too long. Please try again in a moment.";
      }
      return `Error: ${error.message}`;
    }
    
    // Fallback responses
    const fallbackResponses = [
      "I'm having trouble connecting to the market data service. Please try again in a moment.",
      "Our systems are currently experiencing high load. Please try your query again shortly.",
      "I apologize for the inconvenience. The market data service is temporarily unavailable.",
      "I couldn't process your request right now. Please try again later.",
      "Technical difficulties detected. Our team has been notified. Please try again soon."
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};