import React from 'react';
import { X, Minus, Bot } from 'lucide-react';
import { cn } from '@/lib/cn';

interface WelcomeScreenProps {
  onStart: () => void;
  onClose: () => void;
  onMinimize?: () => void;
  className?: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onClose, onMinimize, className }) => {
  return (
    <div className={cn("flex flex-col h-full w-full bg-secondary rounded-3xl overflow-hidden shadow-2xl", className)}>
       {/* Header */}
       <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center shrink-0">
          <h2 className="font-semibold text-lg">Chat with us!</h2>
          <div className="flex gap-2">
             {onMinimize && (
               <button onClick={onMinimize} className="hover:bg-blue-700 p-1 rounded transition-colors" aria-label="Minimize">
                 <Minus size={20} />
               </button>
             )}
             <button onClick={onClose} className="hover:bg-blue-700 p-1 rounded transition-colors" aria-label="Close">
               <X size={20} />
             </button>
          </div>
       </div>

       {/* Content */}
       <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg relative">
             <Bot size={48} className="text-primary" />
             {/* Status indicator */}
             <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-bold text-2xl text-foreground">Welcome! 👋</h3>
            <p className="text-gray-500 text-base leading-relaxed">
              How can we help you today?
            </p>
          </div>

          <div className="w-full pt-4">
            <button 
               onClick={onStart}
               className="w-full bg-primary text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md active:scale-95 transform"
            >
               Start a conversation
            </button>
          </div>
       </div>
    </div>
  );
};
