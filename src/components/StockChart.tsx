import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';
import { ChartPoint } from '../utils/api';

interface StockChartProps {
  data: ChartPoint[];
  isPositive: boolean;
  period: '1D' | '1W' | '1M' | '3M' | '1Y';
}

const StockChart: React.FC<StockChartProps> = ({ data, isPositive, period }) => {
  const formatTooltipLabel = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatYAxisValue = (value: number) => `₹${value.toFixed(0)}`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 bg-opacity-95 border border-gray-600 rounded-lg p-4 shadow-xl">
          <p className="text-gray-300 text-sm mb-2">{formatTooltipLabel(label)}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-gray-400 text-sm">Price:</span>
              <span className="text-white font-bold">₹{data.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-gray-400 text-sm">Volume:</span>
              <span className="text-emerald-400 font-medium">{data.volume.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-6">
      {/* Main Price Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={isPositive ? "#10b981" : "#ef4444"} 
                  stopOpacity={0.4}
                />
                <stop 
                  offset="50%" 
                  stopColor={isPositive ? "#10b981" : "#ef4444"} 
                  stopOpacity={0.1}
                />
                <stop 
                  offset="95%" 
                  stopColor={isPositive ? "#10b981" : "#ef4444"} 
                  stopOpacity={0.0}
                />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
            <XAxis 
              dataKey="timestamp" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              tickFormatter={(value) => {
                const date = new Date(value);
                if (period === '1D') {
                  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
                }
                return date.getDate() + '/' + (date.getMonth() + 1);
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              tickFormatter={formatYAxisValue}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={3}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: isPositive ? "#10b981" : "#ef4444",
                strokeWidth: 3,
                stroke: '#fff',
                filter: 'url(#glow)'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="h-32">
        <div className="flex items-center space-x-2 mb-3">
          <BarChart3 className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400 font-medium">Trading Volume</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.2} />
            <XAxis 
              dataKey="timestamp" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#6b7280' }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.getDate() + '/' + (date.getMonth() + 1);
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#6b7280' }}
              tickFormatter={(value) => formatNumber(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#f9fafb',
                fontSize: '12px',
              }}
              labelFormatter={formatTooltipLabel}
              formatter={(value: number) => [formatNumber(value), 'Volume']}
            />
            <Bar
              dataKey="volume"
              fill="#6366f1"
              fillOpacity={0.6}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;