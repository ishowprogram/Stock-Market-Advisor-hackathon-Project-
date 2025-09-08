import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, BarChart2, Globe, Clock } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import StockCard from '../components/StockCard';
import { StockData } from '../utils/api';

const Dashboard: React.FC = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTicker, setSearchTicker] = useState('');

  const handleStockSearch = (data: StockData) => {
    setStockData(data);
    setIsLoading(false);
  };

  const handleSearchStart = (ticker: string) => {
    setSearchTicker(ticker);
    setIsLoading(true);
  };

  const handleSearchComplete = () => {
    setIsLoading(false);
  };

  const topGainers = [
    { symbol: 'ADANIPORTS', price: 1245.60, change: 8.2 },
    { symbol: 'TATASTEEL', price: 142.85, change: 6.7 },
    { symbol: 'JSWSTEEL', price: 912.40, change: 5.9 },
  ];

  const topLosers = [
    { symbol: 'BAJFINANCE', price: 6789.30, change: -4.2 },
    { symbol: 'HCLTECH', price: 1567.80, change: -3.8 },
    { symbol: 'WIPRO', price: 445.20, change: -2.9 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow">
                <BarChart2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Indian Stock Market Dashboard
                </h1>
                <p className="text-blue-200 text-lg flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Real-time NSE & BSE Analysis Platform
                </p>
              </div>
            </div>
            
            <div className="hidden lg:block text-right">
              <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Market Open</span>
              </div>
              <div className="text-white text-sm">
                {new Date().toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  timeZone: 'Asia/Kolkata'
                })} IST
              </div>
            </div>
          </div>

          <SearchBar 
            onSearchStart={handleSearchStart}
            onSearchComplete={handleSearchComplete}
            onStockFound={handleStockSearch}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading {searchTicker.toUpperCase()} data...</p>
            </div>
          </div>
        )}

        {/* Stock Data Display */}
        {stockData && !isLoading && (
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <StockCard stockData={stockData} />
            </div>
            
            <div className="space-y-6">
              {/* AI Recommendation */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Analysis</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-medium">Recommendation:</span>
                    <span className={`px-4 py-2 rounded-xl text-sm font-bold ${
                      stockData.recommendation === 'Buy' 
                        ? 'bg-emerald-900 bg-opacity-50 text-emerald-300 border border-emerald-700'
                        : stockData.recommendation === 'Hold'
                        ? 'bg-yellow-900 bg-opacity-50 text-yellow-300 border border-yellow-700'
                        : 'bg-red-900 bg-opacity-50 text-red-300 border border-red-700'
                    }`}>
                      {stockData.recommendation}
                    </span>
                  </div>
                  
                  <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {stockData.recommendationReason}
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Gainers */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mr-2" />
                  Top Gainers
                </h4>
                <div className="space-y-3">
                  {topGainers.map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-800 bg-opacity-30 rounded-lg border border-gray-700">
                      <div>
                        <div className="font-semibold text-white text-sm">{stock.symbol}</div>
                        <div className="text-xs text-gray-400">₹{stock.price.toFixed(2)}</div>
                      </div>
                      <div className="text-emerald-400 font-bold text-sm">
                        +{stock.change.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Losers */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <TrendingDown className="w-5 h-5 text-red-400 mr-2" />
                  Top Losers
                </h4>
                <div className="space-y-3">
                  {topLosers.map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-800 bg-opacity-30 rounded-lg border border-gray-700">
                      <div>
                        <div className="font-semibold text-white text-sm">{stock.symbol}</div>
                        <div className="text-xs text-gray-400">₹{stock.price.toFixed(2)}</div>
                      </div>
                      <div className="text-red-400 font-bold text-sm">
                        {stock.change.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Initial State - No Search */}
        {!stockData && !isLoading && (
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 rounded-2xl p-12 shadow-2xl border border-gray-700 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Welcome to Stock Analyzer Pro
            </h3>
            <p className="text-gray-300 max-w-lg mx-auto mb-6 leading-relaxed">
              Enter any NSE or BSE stock ticker symbol to get comprehensive analysis, 
              real-time pricing, AI-powered recommendations, and detailed market insights.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700">
                <div className="text-emerald-400 text-2xl font-bold mb-1">5,000+</div>
                <div className="text-gray-400 text-sm">Stocks Tracked</div>
              </div>
              <div className="p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700">
                <div className="text-emerald-400 text-2xl font-bold mb-1">99.9%</div>
                <div className="text-gray-400 text-sm">Uptime</div>
              </div>
              <div className="p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700">
                <div className="text-emerald-400 text-2xl font-bold mb-1">10ms</div>
                <div className="text-gray-400 text-sm">Real-time Data</div>
              </div>
              <div className="p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700">
                <div className="text-emerald-400 text-2xl font-bold mb-1">AI</div>
                <div className="text-gray-400 text-sm">Powered Analysis</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;