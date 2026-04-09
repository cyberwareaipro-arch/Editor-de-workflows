'use client';

import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Bot, Shield, Layout, CheckCircle, TestTube } from 'lucide-react';
import { useGraphStore } from '@/stores/useGraphStore';

const categoryStyling = {
  'Security': { icon: Shield, color: 'text-purple-400', border: 'border-purple-500/50', shadow: 'shadow-purple-500/20' },
  'Architecture & Design': { icon: Layout, color: 'text-cyan-400', border: 'border-cyan-500/50', shadow: 'shadow-cyan-500/20' },
  'Planning': { icon: CheckCircle, color: 'text-emerald-400', border: 'border-emerald-500/50', shadow: 'shadow-emerald-500/20' },
  'Implementation': { icon: Bot, color: 'text-blue-400', border: 'border-blue-500/50', shadow: 'shadow-blue-500/20' },
  'Testing & QA': { icon: TestTube, color: 'text-pink-400', border: 'border-pink-500/50', shadow: 'shadow-pink-500/20' },
  'Other': { icon: Bot, color: 'text-gray-400', border: 'border-gray-500/50', shadow: 'shadow-gray-500/20' }
};

const SkillNode = ({ id, data, selected }) => {
  const agent = data?.agent || {};
  const category = agent.category || 'Other';
  const styling = categoryStyling[category] || categoryStyling['Other'];
  const Icon = styling.icon;

  const { deleteNode } = useGraphStore();

  return (
    <div className={`relative px-4 py-3 min-w-[200px] max-w-[280px] rounded-xl bg-[#0f1115e6] backdrop-blur-md border ${selected ? styling.border : 'border-[#ffffff1a]'} ${selected ? styling.shadow : 'shadow-lg'} transition-all duration-200 group`}>
      {/* Allows multiple incoming connections */}
      <Handle 
        type="target" 
        position={Position.Top} 
        isConnectable={true} 
        className={`w-3 h-3 bg-gray-800 border-2 ${styling.border.replace('border-', 'border-')}`}
      />
      
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-[#ffffff10] ${styling.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-gray-100 leading-tight">
            {agent.name?.replace(/-/g, ' ') || 'Unknown Skill'}
          </h3>
          <p className="text-[10px] text-gray-400 tracking-wider uppercase mt-0.5">
            {category}
          </p>
        </div>
      </div>

      {selected && (
         <button 
           className="absolute -top-3 -right-3 bg-red-500/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
           onClick={(e) => { e.stopPropagation(); deleteNode(id); }}
           title="Delete Node"
         >
           ✕
         </button>
      )}

      {/* Allows multiple outgoing connections (Star pattern) */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        isConnectable={true} 
        className={`w-3 h-3 bg-gray-800 border-2 ${styling.border.replace('border-', 'border-')}`}
      />
    </div>
  );
};

export default memo(SkillNode);
