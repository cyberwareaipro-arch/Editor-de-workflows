'use client';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Layers } from 'lucide-react';

const MacroWorkflowNode = ({ id, selected }) => {
  return (
    <div className={`px-4 py-3 min-w-[250px] border-2 border-dashed ${selected ? 'border-yellow-400 bg-[#ffff0010]' : 'border-gray-500/50 bg-[#ffffff05]'} rounded-xl backdrop-blur-md transition-all`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-yellow-500" />
      <div className="flex items-center gap-3">
        <Layers className="w-5 h-5 text-yellow-500" />
        <h3 className="font-semibold text-gray-200">Macro Workflow</h3>
      </div>
      <p className="text-xs text-gray-500 mt-2">Grouped skills sub-flow</p>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-yellow-500" />
    </div>
  );
};
export default memo(MacroWorkflowNode);
