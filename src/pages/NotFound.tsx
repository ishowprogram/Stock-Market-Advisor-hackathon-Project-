import React from 'react';
import { Compass } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="text-center bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-10 text-white animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
          <Compass className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="text-gray-300 mb-6">The page you are looking for doesn’t exist.</p>
        <a href="/" className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-colors font-semibold">Go home</a>
      </div>
    </div>
  );
};

export default NotFound;


