'use client';

import React, { useEffect, useState } from 'react';
import { useGraphStore } from '@/stores/useGraphStore';
import { Bot, Settings2 } from 'lucide-react';

export default function MobileLayoutHandler() {
  const { isMobileMode, setIsMobileMode, activeMobilePanel, setActiveMobilePanel } = useGraphStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobileMode(window.innerWidth < 1024); // Consider < 1024px as mobile/tablet mode
    };

    // Initial check
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobileMode]);

  if (!mounted || !isMobileMode) return null;

  const togglePanel = (panel) => {
    setActiveMobilePanel(activeMobilePanel === panel ? 'none' : panel);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 p-1.5 bg-[#0f1115]/90 backdrop-blur-xl border border-[#ffffff15] rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <button
        onClick={() => togglePanel('skills')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeMobilePanel === 'skills' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white hover:bg-[#ffffff10]'}`}
      >
        <Bot className="w-4 h-4" />
        Skills
      </button>
      
      <div className="w-px h-5 bg-[#ffffff20]"></div>

      <button
        onClick={() => togglePanel('options')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeMobilePanel === 'options' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-[#ffffff10]'}`}
      >
        <Settings2 className="w-4 h-4" />
        Options
      </button>
    </div>
  );
}
