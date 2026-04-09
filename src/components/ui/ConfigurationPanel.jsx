'use client';
import React from 'react';
import { useGraphStore } from '@/stores/useGraphStore';

export default function ConfigurationPanel() {
  const { selectedNodeId, nodes, updateNodeData, deleteNode, setSelectedNodeId } = useGraphStore();

  if (!selectedNodeId) return null;

  const node = nodes.find(n => n.id === selectedNodeId);
  if (!node) return null;

  const agent = node.data?.agent;
  const customPrompt = node.data?.customPrompt || '';

  return (
    <aside className="w-80 h-full border-l border-[#ffffff15] bg-[#0f1115e6] backdrop-blur-xl flex flex-col right-0 absolute z-50">
      <div className="p-4 border-b border-[#ffffff15] flex justify-between items-center bg-[#ffffff05]">
        <h2 className="text-sm font-bold tracking-wider uppercase text-gray-300">Node Configuration</h2>
        <button 
          onClick={() => setSelectedNodeId(null)}
          className="text-gray-500 hover:text-white transition-colors"
        >✕</button>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        {agent && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              {agent.name}
            </h3>
            <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-widest">
              {agent.category || 'Skill'}
            </span>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              {agent.description}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-wide text-gray-300">CUSTOM PROMPT (Optional)</label>
          <textarea
            value={customPrompt}
            onChange={(e) => updateNodeData(node.id, { customPrompt: e.target.value })}
            placeholder="Instruct this agent for this specific node..."
            className="w-full h-32 bg-[#ffffff0a] border border-[#ffffff15] rounded-lg p-3 text-sm text-gray-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none transition-all"
          />
        </div>

        <div className="mt-8">
           <button 
             className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm font-semibold transition"
             onClick={() => {
                deleteNode(node.id);
                setSelectedNodeId(null);
             }}
           >
             Delete Node
           </button>
        </div>
      </div>
    </aside>
  );
}
