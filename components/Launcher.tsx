import React from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/cn';

interface LauncherProps {
  onClick: () => void;
  className?: string;
}

export const Launcher: React.FC<LauncherProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 w-[60px] h-[60px] bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200 z-50 cursor-pointer",
        className
      )}
      aria-label="Open chat"
    >
      <MessageSquare className="w-8 h-8 fill-current" />
    </button>
  );
};
