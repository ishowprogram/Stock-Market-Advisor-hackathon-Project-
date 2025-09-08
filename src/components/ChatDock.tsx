import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MessageCircle, Send, X, AlertCircle } from 'lucide-react';
import { askBot, ChatMessage } from '../utils/api';

type MessageStatus = 'sending' | 'sent' | 'received' | 'error' | undefined;

interface ChatMessageExtended extends Omit<ChatMessage, 'status'> {
  status?: MessageStatus;
  error?: string;
}

const ChatDock: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageExtended[]>([{
    id: 'welcome',
    message: "Namaste! I'm your AI advisor for Indian stock markets. Ask me about NSE/BSE stocks, Nifty trends, sectoral analysis, or strategies.",
    isUser: false,
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isTyping) return;
    
    const userMessage: ChatMessageExtended = {
      id: Date.now().toString(),
      message: input,
      isUser: true,
      timestamp: new Date(),
      status: 'sending'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);
    
    try {
      const response = await askBot(input);
      
      const botMessage: ChatMessageExtended = {
        id: `bot-${Date.now()}`,
        message: response,
        isUser: false,
        timestamp: new Date(),
        status: 'received'
      };
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        ).concat(botMessage)
      );
    } catch (error) {
      console.error('Error getting response from bot:', error);
      setError(error instanceof Error ? error.message : 'Failed to get response. Please try again.');
      
      // Update the message status to show error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { 
                ...msg, 
                status: 'error',
                error: error instanceof Error ? error.message : 'Request failed'
              } 
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping]);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };


  return (
    <div className="fixed right-6 bottom-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-xl flex items-center justify-center text-white hover:scale-105 transition-all duration-200 hover:shadow-2xl"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      ) : (
        <div className="w-[360px] h-[520px] bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
            <div>
              <div className="font-semibold text-white">Stock Market Assistant</div>
              <div className="text-xs text-gray-300">Powered by n8n AI Workflow</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => {
              const isUser = msg.isUser;
              const isError = msg.status === 'error';
              const isTyping = !isUser && !msg.message && msg.status === 'sending';
              
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 relative ${
                      isUser
                        ? 'bg-emerald-500 text-white rounded-br-none'
                        : isTyping
                        ? 'bg-white border border-gray-200 rounded-bl-none w-16'
                        : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'
                    } ${isError ? 'border-red-200 bg-red-50' : ''}`}
                  >
                    {isTyping ? (
                      <div className="flex items-center space-x-1 p-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    ) : (
                      <>
                        <div className="text-sm whitespace-pre-wrap">
                          {isError && msg.error ? (
                            <div className="text-red-600 text-xs mb-1 flex items-center">
                              <AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                              <span>{msg.error}</span>
                            </div>
                          ) : null}
                          {msg.message}
                        </div>
                        <div className="text-xs mt-1 opacity-70 flex justify-end items-center">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {isError && (
                            <span className="ml-1 text-red-500">
                              <AlertCircle className="inline w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {error && (
              <div className="text-center">
                <div className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 text-xs rounded-full">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" />
                  {error}
                </div>
              </div>
            )}
            <div ref={endRef} className="h-4" />
          </div>
          
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about stocks, market trends..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all duration-200 disabled:opacity-70"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-gray-400 text-center mt-2">
              {isTyping ? 'AI is thinking...' : 'Ask about NSE, BSE, or market trends'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDock;


