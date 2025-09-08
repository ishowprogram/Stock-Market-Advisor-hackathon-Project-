import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, Sparkles, TrendingUp } from 'lucide-react';
import { askBot, ChatMessage } from '../utils/api';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Namaste! 🙏 I\'m your AI advisor for Indian stock markets. Ask me about NSE/BSE stocks, Nifty trends, sectoral analysis, or investment strategies for Indian equities.',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const botResponse = await askBot(inputMessage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: botResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const quickSuggestions = [
    'Should I invest in Reliance Industries?',
    'Top performing IT stocks on NSE?',
    'Nifty 50 outlook for 2025?',
    'Best dividend paying Indian stocks?',
    'Banking sector analysis',
    'Auto sector investment opportunities'
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col animate-fade-in">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 rounded-t-2xl p-8 border-b border-gray-700 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-3xl font-bold text-white">
                Indian Market AI Assistant
              </h1>
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-blue-200 text-lg">
              Get expert insights on NSE & BSE stocks, market trends, and investment strategies
            </p>
          </div>
          <div className="hidden lg:block text-right">
            <div className="text-emerald-400 font-bold text-lg">Live</div>
            <div className="text-gray-300 text-sm">Market Analysis</div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`flex items-start space-x-4 max-w-3xl ${
                message.isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}>
                {/* Enhanced Avatar */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  message.isUser 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700' 
                    : 'bg-gradient-to-br from-emerald-500 to-emerald-600 animate-pulse-glow'
                }`}>
                  {message.isUser ? (
                    <User className="w-6 h-6 text-white" />
                  ) : (
                    <Bot className="w-6 h-6 text-white" />
                  )}
                </div>

                {/* Enhanced Message Bubble */}
                <div className={`rounded-2xl px-6 py-4 shadow-xl border ${
                  message.isUser
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-500 rounded-br-md'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 text-white border-gray-600 rounded-bl-md'
                }`}>
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  <p className={`text-xs mt-3 ${
                    message.isUser 
                      ? 'text-blue-100' 
                      : 'text-gray-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Enhanced Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-slide-up">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center animate-pulse-glow">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl rounded-bl-md px-6 py-4 border border-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-gray-300 text-sm ml-2">Analyzing market data...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 rounded-b-2xl p-6 border-t border-gray-700 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex space-x-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Indian stocks, NSE/BSE trends, or investment strategies..."
                className="w-full px-6 py-4 border border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-800 text-white placeholder-gray-400 transition-all duration-200 text-lg"
                disabled={isTyping}
              />
            </div>
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-4 rounded-xl transition-all duration-200 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none font-semibold"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          {/* Enhanced Quick Suggestions */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-400 font-medium">Quick Questions:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => setInputMessage(suggestion)}
                  disabled={isTyping}
                  className="px-4 py-3 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700 hover:border-emerald-600 text-left group"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <span>{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;