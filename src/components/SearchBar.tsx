import React, { useState } from 'react';
import { Search, Loader, TrendingUp } from 'lucide-react';
import { getStockData, StockData } from '../utils/api';

interface SearchBarProps {
  onSearchStart: (ticker: string) => void;
  onSearchComplete: () => void;
  onStockFound: (data: StockData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchStart,
  onSearchComplete,
  onStockFound,
}) => {
  const [ticker, setTicker] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const popularStocks = ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'SBIN'];

  const handleSearch = async (searchTicker: string) => {
    if (!searchTicker.trim() || isSearching) return;

    setIsSearching(true);
    onSearchStart(searchTicker);

    try {
      const stockData = await getStockData(searchTicker);
      onStockFound(stockData);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setIsSearching(false);
      onSearchComplete();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(ticker);
  };

  const handleQuickSearch = (stockTicker: string) => {
    setTicker(stockTicker);
    handleSearch(stockTicker);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleFormSubmit} className="relative">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {isSearching ? (
              <Loader className="w-5 h-5 text-emerald-400 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors duration-200" />
            )}
          </div>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Enter NSE/BSE ticker (e.g., RELIANCE, TCS, INFY)"
            className="block w-full pl-12 pr-32 py-4 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-800 text-white placeholder-gray-400 transition-all duration-200 text-lg font-medium"
            disabled={isSearching}
          />
          <button
            type="submit"
            disabled={!ticker.trim() || isSearching}
            className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg transition-all duration-200 disabled:cursor-not-allowed font-semibold text-sm"
          >
            {isSearching ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {/* Quick Search Buttons */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-400 mr-2 flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          Popular:
        </span>
        {popularStocks.map((stock) => (
          <button
            key={stock}
            onClick={() => handleQuickSearch(stock)}
            disabled={isSearching}
            className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700 hover:border-gray-600"
          >
            {stock}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;