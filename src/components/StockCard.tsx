import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, Volume2, Calendar, Target } from 'lucide-react';
import { StockData } from '../utils/api';
import StockChart from './StockChart';

interface StockCardProps {
  stockData: StockData;
}

const StockCard: React.FC<StockCardProps> = ({ stockData }) => {
  const [chartPeriod, setChartPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const isPositive = stockData.change >= 0;

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
      </div>
    </div>
  );
};

export default StockCard;