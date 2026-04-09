'use client';

import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useGraphStore } from '@/stores/useGraphStore';
import SkillNode from './SkillNode';
import MacroWorkflowNode from './MacroWorkflowNode';

const nodeTypes = { 
  skillNode: SkillNode,
  macroNode: MacroWorkflowNode
};

export default function GraphCanvas() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, setSelectedNodeId } = useGraphStore();

  const onSelectionChange = useCallback(({ nodes }) => {
    setSelectedNodeId(nodes.length === 1 ? nodes[0].id : null);
  }, [setSelectedNodeId]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const agentDataStr = event.dataTransfer.getData('application/agent-data');

      if (typeof type === 'undefined' || !type || !agentDataStr) {
        return;
      }

      const agentData = JSON.parse(agentDataStr);
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${agentData.id}-${Date.now()}`,
        type,
        position,
        data: { agent: agentData },
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode]
  );

  return (
    <div className="flex-1 h-full w-full relative" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onSelectionChange={onSelectionChange}
          nodeTypes={nodeTypes}
          fitView
          className="bg-[var(--background)]"
        >
          <Background color="#ffffff20" gap={16} />
          <Controls className="bg-[#ffffff10] border-[#ffffff20] text-gray-200 fill-gray-200" />
          <MiniMap 
            nodeColor={(n) => '#4287f5'}
            maskColor="#0f1115e6"
            className="bg-[#1a1c23] border-[#ffffff20]"
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
