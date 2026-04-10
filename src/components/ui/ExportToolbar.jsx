'use client';
import React, { useState } from 'react';
import { useGraphStore } from '@/stores/useGraphStore';
import { Download, PlayCircle } from 'lucide-react';
import { compileWorkflow } from '@/actions/compileWorkflow';

export default function ExportToolbar() {
  const { nodes, edges, mode, setMode } = useGraphStore();
  const [loading, setLoading] = useState(false);

  const handleCompile = async () => {
    setLoading(true);
    try {
      const response = await compileWorkflow(nodes, edges);
      if (!response.success) {
        alert(response.error);
      } else {
        const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(response.md);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `compiled_workflow_${Date.now()}.md`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }
    } catch (e) {
      alert("System error compiling script.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-40 flex items-center gap-4 bg-[#0f1115/90] p-2 rounded-xl border border-[#ffffff15] backdrop-blur-md">
      <div className="flex items-center gap-2 bg-[#ffffff0a] p-1 rounded-lg">
        <button 
           onClick={() => setMode('design')}
           className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${mode === 'design' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Design
        </button>
        <button 
           onClick={() => setMode('trace')}
           className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1 transition-colors ${mode === 'trace' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <PlayCircle className="w-3 h-3" /> Trace
        </button>
      </div>
      
      <div className="w-px h-6 bg-[#ffffff20]"></div>

      <button 
        onClick={handleCompile}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 text-white rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        {loading ? 'Compiling...' : 'Compile to .MD'}
      </button>
    </div>
  );
}
