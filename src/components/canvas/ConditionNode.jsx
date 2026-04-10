'use client';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { GitBranch } from 'lucide-react';
import { useGraphStore } from '@/stores/useGraphStore';

const ConditionNode = ({ id, selected }) => {
  const { deleteNode, mode } = useGraphStore();

  return (
    <div className={`relative px-4 py-3 min-w-[200px] border-2 ${selected ? 'border-amber-400 bg-[#ffbf0015]' : 'border-amber-500/50 bg-[#ffffff10]'} rounded-xl backdrop-blur-md transition-all group`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-amber-500" />
      <div className="flex items-center gap-3">
        <GitBranch className="w-5 h-5 text-amber-500" />
        <h3 className="font-semibold text-gray-200">If / Else Condition</h3>
      </div>
      
      {selected && mode === 'design' && (
         <button 
           className="absolute -top-3 -right-3 bg-red-500/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
           onClick={(e) => { e.stopPropagation(); deleteNode(id); }}
           title="Delete Node"
         >✕</button>
      )}

      {/* True Branch */}
      <div className="flex justify-between items-end mt-4">
        <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-green-400 mb-1">True</span>
            <Handle type="source" position={Position.Bottom} id="true" className="w-3 h-3 bg-green-500 relative !transform-none !left-auto !translate-x-0" />
        </div>
        <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-red-400 mb-1">False</span>
            <Handle type="source" position={Position.Bottom} id="false" className="w-3 h-3 bg-red-500 relative !transform-none !left-auto !translate-x-0" />
        </div>
      </div>
    </div>
  );
};
export default memo(ConditionNode);
