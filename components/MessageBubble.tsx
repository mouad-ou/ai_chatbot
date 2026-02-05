import React from 'react';
import { cn } from '@/lib/cn';
import { User, Bot } from 'lucide-react';

export type MessageRole = 'user' | 'bot' | 'system';

export interface MessageProps {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  senderName?: string;
  isLoading?: boolean;
}

interface MessageBubbleProps {
  message: MessageProps;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex max-w-[80%] items-end gap-2",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
             <Bot size={16} className="text-primary" />
          </div>
        )}

        <div className={cn(
          "p-3 rounded-2xl text-sm leading-relaxed shadow-sm break-words",
          isUser 
            ? "bg-primary text-primary-foreground rounded-br-none" 
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
        )}>
          {message.isLoading ? (
            <div className="flex gap-1 items-center h-5 px-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
          ) : (
            message.content
          )}
        </div>
      </div>
    </div>
  );
};
