import React from 'react';
import { BarChart3, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 border-b border-gray-700 px-6 py-4 shadow-xl">
      <div className="flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg animate-pulse-glow">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Indian Stock Analyzer
            </h1>
            <p className="text-blue-200 text-sm">NSE & BSE Professional Platform</p>
          </div>
        </NavLink>
        
        <div className="flex items-center space-x-3">
          {/* Market Status */}
          <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-emerald-900 bg-opacity-30 rounded-lg border border-emerald-700">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-300 text-sm font-medium">Market Open</span>
          </div>
          
          {/* Settings */}
          <button className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-200 border border-gray-700 hover:border-gray-600">
            <Settings className="w-5 h-5 text-gray-300 hover:text-white transition-colors duration-200" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;