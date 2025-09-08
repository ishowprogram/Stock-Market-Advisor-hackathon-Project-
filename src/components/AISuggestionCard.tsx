import React from 'react';
import { Bot, Lightbulb, X } from 'lucide-react';

interface AISuggestionCardProps {
  title?: string;
  suggestion: string;
  onClose?: () => void;
}

const AISuggestionCard: React.FC<AISuggestionCardProps> = ({ title = 'AI Suggestion', suggestion, onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-[24rem] animate-fade-in">
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-emerald-600 opacity-10 blur-2xl" />
        <div className="p-5">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-semibold text-white">{title}</h4>
                </div>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {suggestion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionCard;


