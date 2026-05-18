'use client';
import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Bot, AppWindow, FolderOpen, MessageSquare, LogOut, LogIn } from 'lucide-react';
import ChatPanel from '@/components/ui/ChatPanel';
import AppGallery from '@/components/ui/AppGallery';
import WorkflowManager from '@/components/ui/WorkflowManager';
import SkillManager from '@/components/ui/SkillManager';
import { useGraphStore } from '@/stores/useGraphStore';

export default function MobileApp() {
  const { data: session } = useSession();
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [isWorkflowManagerOpen, setWorkflowManagerOpen] = useState(false);
  const [isSkillManagerOpen, setSkillManagerOpen] = useState(false);
  
  const { isChatOpen, setChatOpen, setIsMobileMode } = useGraphStore();

  useEffect(() => {
    setIsMobileMode(true);
  }, [setIsMobileMode]);

  return (
    <main className="flex flex-col h-[100dvh] w-screen overflow-hidden bg-[var(--background)] relative text-white">
       <header className="p-4 border-b border-[#ffffff15] flex justify-between items-center bg-[#0f1115]">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            AI Assistant Mobile
          </h1>
          {session ? (
            <div className="flex items-center gap-3">
              {session.user?.image && <img src={session.user.image} alt="Avatar" className="w-8 h-8 rounded-full border border-[#ffffff20]" />}
              <button onClick={() => signOut()} className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors" aria-label="Cerrar sesión">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button onClick={() => signIn('google')} className="flex items-center gap-2 px-3 py-1.5 bg-white text-black font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors">
              <LogIn className="w-4 h-4" />
              Ingresar
            </button>
          )}
       </header>

       <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          <div className="bg-[#ffffff08] border border-[#ffffff15] rounded-xl p-6 text-center">
             <h2 className="text-lg font-bold text-gray-200 mb-2">Bienvenido a la versión móvil</h2>
             <p className="text-sm text-gray-400">Aquí puedes interactuar con el asistente, crear apps/skills y visualizar tus flujos creados previamente.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setChatOpen(true)} className="p-5 bg-blue-600/10 rounded-2xl border border-blue-500/30 flex flex-col items-center gap-3 hover:bg-blue-600/20 active:scale-95 transition-all">
               <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                 <MessageSquare className="w-8 h-8" />
               </div>
               <span className="text-sm font-semibold text-blue-200 text-center">Asistente<br/>Chat</span>
            </button>
            
            <button onClick={() => setGalleryOpen(true)} className="p-5 bg-orange-600/10 rounded-2xl border border-orange-500/30 flex flex-col items-center gap-3 hover:bg-orange-600/20 active:scale-95 transition-all">
               <div className="p-3 bg-orange-500/20 rounded-full text-orange-400">
                 <AppWindow className="w-8 h-8" />
               </div>
               <span className="text-sm font-semibold text-orange-200 text-center">Mis Apps</span>
            </button>
            
            <button onClick={() => setWorkflowManagerOpen(true)} className="p-5 bg-emerald-600/10 rounded-2xl border border-emerald-500/30 flex flex-col items-center gap-3 hover:bg-emerald-600/20 active:scale-95 transition-all">
               <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
                 <FolderOpen className="w-8 h-8" />
               </div>
               <span className="text-sm font-semibold text-emerald-200 text-center">Mis Workflows</span>
            </button>
            
            <button onClick={() => setSkillManagerOpen(true)} className="p-5 bg-purple-600/10 rounded-2xl border border-purple-500/30 flex flex-col items-center gap-3 hover:bg-purple-600/20 active:scale-95 transition-all">
               <div className="p-3 bg-purple-500/20 rounded-full text-purple-400">
                 <Bot className="w-8 h-8" />
               </div>
               <span className="text-sm font-semibold text-purple-200 text-center">Mis Skills</span>
            </button>
          </div>
       </div>

       {/* ChatPanel ya está diseñado para aparecer flotante (y ajustado a móviles con las clases que modificamos) */}
       <div className="relative z-50">
          <ChatPanel />
       </div>

       <AppGallery isOpen={isGalleryOpen} onClose={() => setGalleryOpen(false)} />
       <WorkflowManager isOpen={isWorkflowManagerOpen} onClose={() => setWorkflowManagerOpen(false)} />
       <SkillManager isOpen={isSkillManagerOpen} onClose={() => setSkillManagerOpen(false)} />
    </main>
  );
}
