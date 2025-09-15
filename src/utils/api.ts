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
  peRatio: number;
  eps: number;
  roePercent: number;
  debtToEquity: number;
  dividendYieldPercent: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  pros: string[];
  cons: string[];
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

// Alpha Vantage + OpenAI integration
const AV_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY as string | undefined;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
const OPENAI_MODEL = (import.meta.env.VITE_OPENAI_MODEL as string | undefined) || 'gpt-4o-mini';

const withTimeout = async <T>(promise: Promise<T>, ms = 15000): Promise<T> => {
  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Request timeout')), ms));
  return Promise.race([promise, timeout]);
};

const toNseSymbol = (ticker: string) => {
  const t = ticker.trim().toUpperCase();
  if (t.endsWith('.NS') || t.endsWith('.BSE')) return t;
  return `${t}.NS`;
};

export const getStockData = async (ticker: string): Promise<StockData> => {
  if (!AV_API_KEY) throw new Error('Missing Alpha Vantage API key. Set VITE_ALPHA_VANTAGE_API_KEY in your .env');

  const symbol = toNseSymbol(ticker);

  // Fetch real-time data
  const quoteUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${AV_API_KEY}`;
  const dailyUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(symbol)}&outputsize=compact&apikey=${AV_API_KEY}`;

  const [quoteRes, dailyRes] = await Promise.all([
    withTimeout(fetch(quoteUrl)),
    withTimeout(fetch(dailyUrl))
  ]);

  const quoteJson = await quoteRes.json();
  const dailyJson = await dailyRes.json();

  const q = quoteJson['Global Quote'] || {};
  const series = dailyJson['Time Series (Daily)'] || {};
  const dates = Object.keys(series).sort();

  // Build chart data (last 30 sessions)
  const chartData: ChartPoint[] = dates.slice(-30).map(d => ({
    timestamp: d,
    price: Number(series[d]['4. close']),
    volume: Number(series[d]['5. volume'])
  })).filter(p => Number.isFinite(p.price));

  const lastPoint = chartData.length ? chartData[chartData.length - 1] : undefined;
  const price = Number(q['05. price'] || (lastPoint?.price ?? 0));
  const change = Number(q['09. change'] || 0);
  const changePercentStr = (q['10. change percent'] || '0%') as string;
  const changePercent = Number(changePercentStr.replace('%', ''));
  const volume = Number(q['06. volume'] || (lastPoint?.volume ?? 0));

  // 52 week range approximation from available series
  const closes = chartData.map(p => p.price);
  const high52Week = closes.length ? Math.max(...closes) : price;
  const low52Week = closes.length ? Math.min(...closes) : price;

  // Simple heuristic recommendation
  const recommendation: 'Buy' | 'Hold' | 'Sell' = changePercent > 1.5 ? 'Buy' : changePercent < -1.5 ? 'Sell' : 'Hold';
  const reasonMap = {
    Buy: 'Positive momentum and strong short-term trend. Consider proper risk management.',
    Hold: 'Neutral trend. Consider waiting for clearer signals or fundamental confirmation.',
    Sell: 'Negative momentum detected. Consider reducing exposure or wait for stabilization.'
  } as const;

  const riskLevel: 'Low' | 'Medium' | 'High' = Math.abs(changePercent) > 2.5 ? 'High' : Math.abs(changePercent) > 1.2 ? 'Medium' : 'Low';

  // Fundamentals may not be available for NSE/BSE via AV; keep placeholders
  const peRatio = 0;
  const eps = 0;
  const roePercent = 0;
  const debtToEquity = 0;
  const dividendYieldPercent = 0;

  const pros: string[] = [];
  const cons: string[] = [];
  if (changePercent > 1) pros.push('Price showing upward momentum');
  if (changePercent < -1) cons.push('Short-term downward pressure');
  if (riskLevel === 'Low') pros.push('Lower short-term volatility');
  if (riskLevel === 'High') cons.push('Elevated volatility risk');

  return {
    symbol,
    price: Number(price.toFixed(2)),
    change: Number(change.toFixed(2)),
    changePercent: Number(changePercent.toFixed(2)),
    volume,
    marketCap: 'N/A',
    high52Week: Number(high52Week.toFixed(2)),
    low52Week: Number(low52Week.toFixed(2)),
    chartData,
    recommendation,
    recommendationReason: reasonMap[recommendation],
    peRatio,
    eps,
    roePercent,
    debtToEquity,
    dividendYieldPercent,
    riskLevel,
    pros,
    cons,
  };
};

export const askBot = async (message: string): Promise<string> => {
  // Simulate typing delay for UX parity
  await new Promise(resolve => setTimeout(resolve, 600));

  if (!OPENAI_API_KEY) {
    return 'OpenAI API key is missing. Please set VITE_OPENAI_API_KEY in your .env file.';
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: 'system', content: 'You are an AI assistant for Indian stock markets (NSE/BSE). Provide clear, concise, and compliant insights. Avoid financial advice disclaimers beyond general caution.' },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content === 'string' && content.length > 0) {
      return content.trim();
    }
    return 'Received an unexpected response from the AI. Please try again.';
  } catch (error: unknown) {
    console.error('Error in askBot:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return 'The AI request timed out. Please try again.';
      }
      return `Error: ${error.message}`;
    }
    return 'An unknown error occurred while contacting the AI.';
  }
};