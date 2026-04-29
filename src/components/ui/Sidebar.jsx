'use client';

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Bot, Shield, Architecture, Layout, TestTube, CheckCircle, GitBranch, Rocket } from 'lucide-react';

const categoryIcons = {
  'Security': <Shield className="w-4 h-4 text-purple-400" />,
  'Architecture & Design': <Layout className="w-4 h-4 text-cyan-400" />,
  'Planning': <CheckCircle className="w-4 h-4 text-emerald-400" />,
  'Implementation': <Bot className="w-4 h-4 text-blue-400" />,
  'Testing & QA': <TestTube className="w-4 h-4 text-pink-400" />,
  'Deployment': <Rocket className="w-4 h-4 text-orange-400" />,
  'Other': <Bot className="w-4 h-4 text-gray-400" />
};

export default function Sidebar({ agents }) {
  const { data: session } = useSession();

  const onDragStart = (event, agent, specificType = 'skillNode') => {
    event.dataTransfer.setData('application/reactflow', specificType);
    event.dataTransfer.setData('application/agent-data', JSON.stringify(agent));
    event.dataTransfer.effectAllowed = 'move';
  };

  // Group agents by category
  const groupedAgents = agents.reduce((acc, agent) => {
    const cat = agent.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(agent);
    return acc;
  }, {});

  return (
    <aside className="w-80 h-full border-r border-[#ffffff15] bg-[var(--panel-bg)] backdrop-blur-xl flex flex-col overflow-y-auto">
      <div className="p-5 border-b border-[#ffffff15]">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          AI Workflow Editor
        </h1>
        <p className="text-xs text-gray-400 mt-1 mb-4">Arrastra skills al lienzo para conectarlos.</p>
        
        {session ? (
          <div className="flex items-center justify-between bg-[#ffffff0a] p-2 rounded-lg border border-[#ffffff15]">
            <div className="flex items-center gap-2">
              {session.user?.image && <img src={session.user.image} alt="Avatar" className="w-6 h-6 rounded-full" />}
              <span className="text-xs text-gray-300 truncate max-w-[120px]">{session.user?.email}</span>
            </div>
            <button onClick={() => signOut()} className="text-xs text-red-400 hover:text-red-300">Salir</button>
          </div>
        ) : (
          <button 
            onClick={() => signIn("google")} 
            className="w-full py-2 bg-white text-black font-semibold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            Sign in with Google
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col gap-6">
        {/* Structural Nodes Static Group */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-2">
            <GitBranch className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm tracking-widest uppercase font-semibold text-gray-300">Logic & Rules</h2>
          </div>
          <div className="flex flex-col gap-2">
              <div
                  draggable
                  onDragStart={(e) => onDragStart(e, { id: 'structural-if-else', name: 'If / Else Condition', category: 'Logic' }, 'conditionNode')}
                  className="p-3 rounded-lg bg-[#ffffff08] border border-amber-500/30 hover:bg-[#ffffff15] hover:border-amber-400/50 cursor-grab active:cursor-grabbing transition-all duration-200 group"
                >
                  <h3 className="text-sm font-medium text-gray-100 group-hover:text-amber-300 transition-colors">
                    If / Else Condition
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    Routes flow based on a simulated logical condition boolean.
                  </p>
              </div>
          </div>
        </div>

        {Object.entries(groupedAgents).map(([category, items]) => (
          <div key={category}>
            <div className="flex items-center gap-2 mb-3 px-2">
               {categoryIcons[category] || categoryIcons['Other']}
               <h2 className="text-sm tracking-widest uppercase font-semibold text-gray-300">
                 {category}
               </h2>
            </div>
            <div className="flex flex-col gap-2">
              {items.map((agent) => (
                <div
                  key={agent.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, agent)}
                  className="p-3 rounded-lg bg-[#ffffff08] border border-[#ffffff10] hover:bg-[#ffffff15] hover:border-blue-400/50 cursor-grab active:cursor-grabbing transition-all duration-200 group"
                >
                  <h3 className="text-sm font-medium text-gray-100 group-hover:text-blue-300 transition-colors">
                    {agent.name.replace(/-/g, ' ')}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {agent.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
