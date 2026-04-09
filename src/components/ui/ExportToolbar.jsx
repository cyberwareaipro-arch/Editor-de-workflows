'use client';
import React from 'react';
import { useGraphStore } from '@/stores/useGraphStore';
import { Download } from 'lucide-react';

export default function ExportToolbar() {
  const { nodes, edges } = useGraphStore();

  const handleExport = () => {
    const payload = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      workflows: nodes.map(node => ({
        localId: node.id,
        type: node.type,
        agentName: node.data?.agent?.name,
        category: node.data?.agent?.category,
        customPrompt: node.data?.customPrompt || null,
        position: node.position
      })),
      connections: edges.map(edge => ({
        source: edge.source,
        target: edge.target
      }))
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `ai_workflow_${Date.now()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="absolute top-4 right-4 z-40">
      <button 
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 text-white rounded-lg font-semibold text-sm transition-all"
      >
        <Download className="w-4 h-4" />
        Export Workflow
      </button>
    </div>
  );
}
