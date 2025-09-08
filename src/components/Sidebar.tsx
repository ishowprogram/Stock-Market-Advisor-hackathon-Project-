import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageCircle, Info, TrendingUp, BarChart3, PieChart, Briefcase } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard', description: 'Market Overview' },
    { to: '/chatbot', icon: MessageCircle, label: 'AI Assistant', description: 'Investment Advice' },
    { to: '/about', icon: Info, label: 'About', description: 'Platform Info' },
  ];

  const quickStats = [
    { label: 'NIFTY 50', value: '21,737', change: '+0.8%', isPositive: true },
    { label: 'SENSEX', value: '71,595', change: '+1.2%', isPositive: true },
  ];

  return (
    <aside className={`bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-80'
    } min-h-screen border-r border-gray-700 shadow-2xl`}>
      <div className="p-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-gray-700">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <span className="text-lg font-bold text-white">Market Pro</span>
              <p className="text-xs text-gray-400">Indian Markets</p>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
              {!isCollapsed && (
                <div className="flex-1">
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Market Stats */}
        {!isCollapsed && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Market Pulse
            </h4>
            {quickStats.map((stat) => (
              <div key={stat.label} className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">{stat.label}</span>
                  <span className={`text-xs font-bold ${
                    stat.isPositive ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;