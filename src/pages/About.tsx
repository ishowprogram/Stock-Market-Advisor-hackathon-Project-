import React from 'react';
import { BarChart3, Bot, TrendingUp, Shield, Users, Zap, Globe, Award, Target } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time NSE & BSE Data',
      description: 'Get instant access to live Indian stock data, price movements, and comprehensive market analytics from both NSE and BSE exchanges.',
    },
    {
      icon: Bot,
      title: 'AI-Powered Indian Market Insights',
      description: 'Our advanced AI understands Indian market dynamics, providing personalized investment recommendations for Nifty, Sensex, and sectoral stocks.',
    },
    {
      icon: TrendingUp,
      title: 'Indian Market Trends',
      description: 'Stay ahead with detailed trend analysis of Indian indices, FII/DII flows, and 52-week performance tracking of Indian equities.',
    },
    {
      icon: Shield,
      title: 'SEBI Compliant & Secure',
      description: 'Bank-level security with SEBI compliance ensures your Indian market data and analysis remain private and protected.',
    },
    {
      icon: Users,
      title: 'Professional Indian Trading Tools',
      description: 'Access institutional-grade tools designed for Indian market participants, from retail investors to professional traders.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast Indian Data',
      description: 'Experience blazing-fast performance with real-time NSE & BSE updates and instant Indian market analysis.',
    },
  ];

  const achievements = [
    { icon: Award, label: 'SEBI Registered', value: 'Compliant Platform' },
    { icon: Globe, label: 'Indian Coverage', value: '5000+ NSE/BSE Stocks' },
    { icon: Target, label: 'Accuracy Rate', value: '99.9% Data Precision' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 rounded-2xl p-12 text-white shadow-2xl border border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Indian Stock Analyzer Pro
                  </h1>
                  <p className="text-blue-200 text-2xl font-medium">
                    Professional NSE & BSE Analysis Platform
                  </p>
                </div>
              </div>
              
              <p className="text-xl text-gray-100 leading-relaxed mb-8">
                Empowering Indian investors with cutting-edge technology, real-time NSE & BSE data, and AI-driven insights. 
                Make informed investment decisions in Indian equity markets with comprehensive analysis of Nifty 50, Bank Nifty, 
                sectoral indices, and individual stock performance.
              </p>
              
              <div className="grid grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={achievement.label} className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <achievement.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{achievement.value}</div>
                    <div className="text-blue-200 text-sm">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="w-80 h-64 bg-gray-800 bg-opacity-30 rounded-2xl border border-gray-600 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300 font-medium">Live Market Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400 text-sm">Active</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">NIFTY 50</span>
                    <div className="text-right">
                      <div className="text-white font-bold">21,737.60</div>
                      <div className="text-emerald-400 text-sm">+0.8%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">SENSEX</span>
                    <div className="text-right">
                      <div className="text-white font-bold">71,595.53</div>
                      <div className="text-emerald-400 text-sm">+1.2%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">BANK NIFTY</span>
                    <div className="text-right">
                      <div className="text-white font-bold">46,821.35</div>
                      <div className="text-red-400 text-sm">-0.3%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Grid */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            Powerful Features for Indian Market Investing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our platform combines advanced technology with deep understanding of Indian markets to deliver 
            professional-grade NSE & BSE analysis tools for every type of Indian investor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl hover:border-gray-600 transition-all duration-300 hover:-translate-y-2 animate-slide-up group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Technology Stack */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Built Specifically for Indian Markets
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-white font-bold text-xl">React</span>
            </div>
            <h4 className="font-bold text-white mb-2 text-lg">React 18</h4>
            <p className="text-gray-400">Modern frontend framework for responsive Indian market interfaces</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-white font-bold text-xl">TS</span>
            </div>
            <h4 className="font-bold text-white mb-2 text-lg">TypeScript</h4>
            <p className="text-gray-400">Type-safe development for reliable Indian market data handling</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-white font-bold text-xl">CSS</span>
            </div>
            <h4 className="font-bold text-white mb-2 text-lg">Tailwind CSS</h4>
            <p className="text-gray-400">Utility-first styling optimized for financial interfaces</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-white font-bold text-lg">NSE</span>
            </div>
            <h4 className="font-bold text-white mb-2 text-lg">NSE & BSE APIs</h4>
            <p className="text-gray-400">Direct integration with Indian stock exchange data feeds</p>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 rounded-2xl p-12 border border-emerald-700 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Master Indian Stock Markets?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Join thousands of successful Indian investors who trust our platform for NSE & BSE market analysis, 
            AI-powered insights, and data-driven investment decisions in Indian equity markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1 hover:bg-gray-100">
              Start Analyzing Indian Stocks
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:bg-white hover:text-emerald-900 transform hover:-translate-y-1">
              View Live Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;