import React, { useMemo, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, Volume2, Target } from 'lucide-react';
import { StockData } from '../utils/api';
import StockChart from './StockChart';

interface StockCardProps {
  stockData: StockData;
}

const StockCard: React.FC<StockCardProps> = ({ stockData }) => {
  const [chartPeriod, setChartPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const [activeTab, setActiveTab] = useState<'Overview' | 'Fundamentals' | 'AI'>('Overview');
  const isPositive = stockData.change >= 0;

  const fiftyTwoWeekRangePercent = useMemo(() => {
    const range = stockData.high52Week - stockData.low52Week;
    if (range <= 0) return 0;
    return Math.min(100, Math.max(0, ((stockData.price - stockData.low52Week) / range) * 100));
  }, [stockData.price, stockData.low52Week, stockData.high52Week]);

  // Derived AI trading tips (mock heuristics for richer UI)
  const actionLabel = stockData.recommendation;
  const entryLower = Math.max(stockData.low52Week, Number((stockData.price * 0.985).toFixed(2)));
  const entryUpper = Number((stockData.price * 1.005).toFixed(2));
  const target = Number((stockData.price * (actionLabel === 'Sell' ? 0.97 : 1.06)).toFixed(2));
  const stopLoss = Number((stockData.price * (actionLabel === 'Sell' ? 1.03 : 0.95)).toFixed(2));
  const horizon = actionLabel === 'Buy' ? '3-6 months' : actionLabel === 'Hold' ? '4-8 weeks' : '1-3 weeks';

  const formatNumber = (num: number) => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(1)}Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`;
    }
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const chartPeriods = [
    { key: '1D' as const, label: '1D' },
    { key: '1W' as const, label: '1W' },
    { key: '1M' as const, label: '1M' },
    { key: '3M' as const, label: '3M' },
    { key: '1Y' as const, label: '1Y' },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 animate-slide-up overflow-hidden">
      {/* Header with Stock Info */}
      <div className="p-8 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                {stockData.symbol}
              </h2>
              <p className="text-gray-400 text-sm flex items-center">
                <Activity className="w-4 h-4 mr-1" />
                NSE • Live Market Data
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-1">
              ₹{stockData.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className={`flex items-center space-x-2 justify-end ${
              isPositive ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span className="font-bold text-lg">
                ₹{isPositive ? '+' : ''}{stockData.change.toFixed(2)} 
                ({isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        {/* 52W Range band (Groww-like) */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>52W Low ₹{stockData.low52Week.toLocaleString('en-IN')}</span>
            <span>52W High ₹{stockData.high52Week.toLocaleString('en-IN')}</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full border border-gray-700 relative">
            <div className={`${isPositive ? 'bg-emerald-600' : 'bg-red-500'} h-full rounded-full`} style={{ width: `${fiftyTwoWeekRangePercent}%` }} />
            <div className="absolute -top-1 w-3 h-3 bg-white rounded-full border-2 border-gray-700" style={{ left: `calc(${fiftyTwoWeekRangePercent}% - 6px)` }} />
          </div>
          <div className="flex justify-between text-[11px] text-gray-500 mt-1">
            <span>Position</span>
            <span>{fiftyTwoWeekRangePercent.toFixed(0)}%</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">Volume</span>
            </div>
            <p className="text-lg font-bold text-white">
              {formatNumber(stockData.volume)}
            </p>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">Market Cap</span>
            </div>
            <p className="text-lg font-bold text-white">
              {stockData.marketCap}
            </p>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">52W High</span>
            </div>
            <p className="text-lg font-bold text-white">
              ₹{stockData.high52Week.toLocaleString('en-IN')}
            </p>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">52W Low</span>
            </div>
            <p className="text-lg font-bold text-white">
              ₹{stockData.low52Week.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Fundamentals */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="text-xs text-gray-400 mb-1">P/E Ratio</div>
            <div className="text-white font-semibold">{stockData.peRatio.toFixed(1)}</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="text-xs text-gray-400 mb-1">EPS</div>
            <div className="text-white font-semibold">₹{stockData.eps.toFixed(2)}</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="text-xs text-gray-400 mb-1">ROE</div>
            <div className="text-white font-semibold">{stockData.roePercent.toFixed(1)}%</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="text-xs text-gray-400 mb-1">Debt/Equity</div>
            <div className="text-white font-semibold">{stockData.debtToEquity.toFixed(2)}</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="text-xs text-gray-400 mb-1">Dividend Yield</div>
            <div className="text-white font-semibold">{stockData.dividendYieldPercent.toFixed(2)}%</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="inline-flex bg-gray-800 rounded-lg p-1 border border-gray-700">
            {(['Overview','Fundamentals','AI'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === tab ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Chart Section */}
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">
              Price Movement
            </h3>
          </div>
          
          {/* Chart Period Selector */}
          <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
            {chartPeriods.map((period) => (
              <button
                key={period.key}
                onClick={() => setChartPeriod(period.key)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  chartPeriod === period.key
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800 bg-opacity-30 rounded-xl p-6 border border-gray-700">
          <StockChart data={stockData.chartData} isPositive={isPositive} period={chartPeriod} />
        </div>

        {/* Performance Metrics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Day's Range</span>
              <div className="text-right">
                <div className="text-white font-semibold">
                  ₹{(stockData.price * 0.98).toFixed(2)} - ₹{(stockData.price * 1.02).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Avg Volume</span>
              <div className="text-right">
                <div className="text-white font-semibold">
                  {formatNumber(stockData.volume * 0.8)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">P/E Ratio</span>
              <div className="text-right">
                <div className="text-white font-semibold">
                  {(Math.random() * 30 + 10).toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Tips - enlarged and richer */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800 bg-opacity-60 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-bold text-lg">AI Tips</span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                stockData.recommendation === 'Buy'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                  : stockData.recommendation === 'Hold'
                  ? 'bg-yellow-900/60 text-yellow-300 border border-yellow-700'
                  : 'bg-red-900/60 text-red-300 border border-red-700'
              }`}>
                {stockData.recommendation}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-xs mb-1">Suggested Entry</div>
                <div className="text-white font-semibold">₹{entryLower} - ₹{entryUpper}</div>
              </div>
              <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-xs mb-1">Target / Stop-loss</div>
                <div className="text-white font-semibold">Target ₹{target} • SL ₹{stopLoss}</div>
              </div>
              <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-xs mb-1">Suggested Horizon</div>
                <div className="text-white font-semibold">{horizon}</div>
              </div>
              <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-xs mb-1">Risk Level</div>
                <div className="text-white font-semibold">{stockData.riskLevel}</div>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-5">{stockData.recommendationReason}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-4">
                <div className="text-emerald-400 text-xs font-bold uppercase mb-2">Pros</div>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                  {stockData.pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-4">
                <div className="text-red-400 text-xs font-bold uppercase mb-2">Risks</div>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                  {stockData.cons.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-60 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="text-white font-semibold mb-2">Action</div>
            <div className="text-sm text-gray-300 mb-3">{
              stockData.recommendation === 'Buy' ? 'Consider staggered buying on dips.' :
              stockData.recommendation === 'Hold' ? 'Maintain position with tight SL.' :
              'Consider partial/complete exit on strength.'
            }</div>
            <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-lg font-semibold transition-all">Get Personalized Advice</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard;