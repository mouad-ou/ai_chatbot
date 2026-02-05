import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, ThumbsUp, ThumbsDown, Paperclip, Send, Bot } from 'lucide-react';
import { MessageBubble, MessageProps } from './MessageBubble';
import { cn } from '@/lib/cn';

interface ChatWindowProps {
  onClose: () => void;
  onMinimize?: () => void;
  className?: string;
}

const INITIAL_MESSAGES: MessageProps[] = [
  {
    id: '1',
    role: 'bot',
    content: 'Hello! How can I help you with your order today?',
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: '2',
    role: 'user',
    content: 'Hi, do you ship to Casablanca?',
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: '3',
    role: 'bot',
    content: 'Yes! We ship all over Morocco. Delivery to Casablanca usually takes 24-48 hours. Shipping cost is 20 MAD.',
    timestamp: new Date(),
  }
];

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, onMinimize, className }) => {
  const [messages, setMessages] = useState<MessageProps[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: MessageProps = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Add loading message
    const loadingMessageId = (Date.now() + 1).toString();
    const loadingMessage: MessageProps = {
      id: loadingMessageId,
      role: 'bot',
      content: '', // Content is ignored when isLoading is true
      timestamp: new Date(),
      isLoading: true,
    };
    setMessages(prev => [...prev, loadingMessage]);

    // Simulate bot response
    setTimeout(() => {
      const fullResponse = "I'm a demo bot. I can't really answer that yet, but I'm learning!";
      let charIndex = 0;

      // Initialize typing
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessageId
          ? { ...msg, isLoading: false, content: '' }
          : msg
      ));

      const intervalId = setInterval(() => {
        setMessages(prev => prev.map(msg => {
          if (msg.id === loadingMessageId) {
            return {
              ...msg,
              content: fullResponse.slice(0, charIndex + 1)
            };
          }
          return msg;
        }));

        charIndex++;
        if (charIndex === fullResponse.length) {
          clearInterval(intervalId);
        }
      }, 30);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn("flex flex-col h-full w-full bg-secondary rounded-3xl overflow-hidden shadow-2xl font-sans", className)}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
             <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot size={24} className="text-primary" />
             </div>
             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-900">Support Assistant</h3>
            <span className="text-xs text-green-600 block">Online</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-gray-400">
           <div className="flex gap-1 mr-2 border-r border-gray-200 pr-3">
              <button className="hover:text-green-500 transition-colors p-1" title="Helpful">
                <ThumbsUp size={18} />
              </button>
              <button className="hover:text-red-500 transition-colors p-1" title="Not helpful">
                <ThumbsDown size={18} />
              </button>
           </div>
           {onMinimize && (
               <button onClick={onMinimize} className="hover:text-gray-600 transition-colors p-1">
                 <Minus size={20} />
               </button>
           )}
           <button onClick={onClose} className="hover:text-gray-600 transition-colors p-1">
             <X size={20} />
           </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#f6f6f7]">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-100 shrink-0">
         <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <button className="text-gray-400 hover:text-gray-600 p-2 transition-colors">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400 text-sm"
              autoFocus
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-2 bg-primary text-white rounded-xl shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send size={18} />
            </button>
         </div>
         <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400">Powered by Moroccan Chatbot</span>
         </div>
      </div>
    </div>
  );
};
