'use client';

import React, { useState } from 'react';
import { Launcher } from './Launcher';
import { WelcomeScreen } from './WelcomeScreen';
import { ChatWindow } from './ChatWindow';
import { cn } from '@/lib/cn';

export const ChatWidget = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [screen, setScreen] = useState<'welcome' | 'chat'>('welcome');

   const handleToggle = () => setIsOpen(prev => !prev);
   
   const handleClose = () => {
     setIsOpen(false);
     // Optional: Reset screen to welcome after delay or keep state
   };

   const handleStart = () => {
     setScreen('chat');
   };

   return (
     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
        {/* Widget Container */}
        <div 
          className={cn(
            "will-change-transform transition-all duration-300 ease-in-out transform origin-bottom-right",
            isOpen 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 translate-y-10 pointer-events-none"
          )}
        >
           <div className="w-[380px] h-[600px] max-h-[80vh] shadow-2xl rounded-3xl overflow-hidden bg-transparent">
              {screen === 'welcome' ? (
                  <WelcomeScreen onStart={handleStart} onClose={handleClose} onMinimize={handleClose} className="h-full" />
              ) : (
                  <ChatWindow onClose={handleClose} onMinimize={handleClose} className="h-full" />
              )}
           </div>
        </div>
        
        {/* Launcher Button 
            When open, we can hide it or change it. 
            Spec doesn't say. 
            Usually it stays or transforms. 
            If I hide it, the floating button disappears.
            I'll keep it visible but maybe hidden behind the chat if it overlaps?
            The container is 'bottom-6 right-6'. Launcher is 'bottom-6 right-6'.
            They overlap.
            I should move the widget UP if launcher is there?
            Or hide launcher when open.
        */}
        <div className={cn(
            "transition-all duration-300 transform",
            isOpen ? "opacity-0 scale-50 pointer-events-none absolute" : "opacity-100 scale-100 relative"
        )}>
           <Launcher onClick={handleToggle} className="static" />
        </div>
     </div>
   );
};
