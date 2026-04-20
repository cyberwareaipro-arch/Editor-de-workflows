'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useGraphStore } from '@/stores/useGraphStore';
import { Download, PlayCircle, Bot, Sparkles, FileJson, X, Code2 } from 'lucide-react';
import { compileWorkflow } from '@/actions/compileWorkflow';
import AntigravityClient from '@/lib/antigravity';

export default function ExportToolbar() {
  const { nodes, edges, mode, setMode, isChatOpen, setChatOpen, isAntigravityConnected, setAntigravityConnected } = useGraphStore();
  const [loading, setLoading] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  const syncTimeoutRef = useRef(null);

  // Auto-sync effect
  useEffect(() => {
    // Solo auto-sincronizar si la IA está conectada
    if (!isAntigravityConnected) return;

    if (nodes.length > 0 || edges.length > 0) {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      
      syncTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await compileWorkflow(nodes, edges);
          if (!response.success) return;

          const rawStructure = {
            nodes: nodes.map(n => ({ id: n.id, type: n.type, data: { agent: n.data?.agent?.name, customPrompt: n.data?.customPrompt } })),
            edges: edges.map(e => ({ id: e.id, source: e.source, target: e.target }))
          };

          const contextText = `# Contexto del Workflow\n\nResumen del flujo actual:\n\n${response.md}\n\n## Estructura RAW:\n\`\`\`json\n${JSON.stringify(rawStructure, null, 2)}\n\`\`\`\n`;
          
          await AntigravityClient.sendContext(contextText);
          console.log('[Antigravity] Context auto-synced.');
        } catch (e) {
          console.warn('[Antigravity] Auto-sync failed:', e.message);
        }
      }, 3000); // Debounce de 3 segundos
    }
    
    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [nodes, edges, isAntigravityConnected]);

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

  const handleToggleAntigravity = async () => {
    if (isAntigravityConnected) {
      // Desconectar
      setAntigravityConnected(false);
      return;
    }

    setLoading(true);
    try {
      const response = await compileWorkflow(nodes, edges);
      let md = response.success ? response.md : "Workflow is empty or invalid.";
      
      const rawStructure = {
        nodes: nodes.map(n => ({ id: n.id, type: n.type, data: { agent: n.data?.agent?.name, customPrompt: n.data?.customPrompt } })),
        edges: edges.map(e => ({ id: e.id, source: e.source, target: e.target }))
      };

      const contextText = `# Contexto del Workflow\n\nResumen del flujo actual:\n\n${md}\n\n## Estructura RAW:\n\`\`\`json\n${JSON.stringify(rawStructure, null, 2)}\n\`\`\`\n`;

      // Enviar a la API local a través del nuevo cliente
      await AntigravityClient.sendContext(contextText);
      setAntigravityConnected(true);
    } catch (e) {
      alert("Error linking with Antigravity: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJsonSubmit = async () => {
    if (!jsonInput.trim()) return;
    setLoading(true);
    try {
      const parsed = JSON.parse(jsonInput);
      const res = await fetch('/api/antigravity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });
      const data = await res.json();
      
      if (data.success) {
        window.open(data.publicUrl, "_blank");
        setShowJsonModal(false);
        setJsonInput("");
      } else {
        alert("Error de API: " + (data.error || "Desconocido"));
      }
    } catch (e) {
      alert("Ocurrió un error. Asegúrate de que el JSON es válido.\nError: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-40 flex items-center gap-4 bg-[#0f1115]/90 p-2 rounded-xl border border-[#ffffff15] backdrop-blur-md">
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
          onClick={() => setShowJsonModal(true)}
          className="flex items-center gap-2 px-4 py-1.5 bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-500/20 text-white rounded-lg font-semibold text-sm transition-all"
        >
          <FileJson className="w-4 h-4" />
          Ingresar JSON
        </button>

        <button 
          onClick={handleCompile}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 text-white rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {loading ? 'Compiling...' : 'Compile'}
        </button>

        <button 
          onClick={handleToggleAntigravity}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-lg disabled:opacity-50 ${isAntigravityConnected ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20 text-white border border-emerald-500/50' : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20 text-white'}`}
        >
          <Sparkles className={`w-4 h-4 ${isAntigravityConnected ? 'animate-pulse' : ''}`} />
          {loading ? '...' : isAntigravityConnected ? 'AI Connected' : 'Connect AI'}
        </button>

        <div className="w-px h-6 bg-[#ffffff20]"></div>

        <button 
          onClick={() => setChatOpen(!isChatOpen)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-semibold text-sm transition-all shadow-lg ${isChatOpen ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20 text-white' : 'bg-[#ffffff10] hover:bg-[#ffffff20] text-gray-300'}`}
        >
          <Bot className="w-4 h-4" />
          Chat
        </button>
      </div>

      {/* Premium JSON Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1a1d24] border border-[#ffffff15] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col transform transition-all scale-100">
            
            <div className="flex items-center justify-between p-4 border-b border-[#ffffff10] bg-[#ffffff05]">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <Code2 className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-100">Ingresar Payload IA</h3>
                  <p className="text-xs text-gray-400">Pega el JSON con el archivo en Base64 aquí</p>
                </div>
              </div>
              <button 
                onClick={() => setShowJsonModal(false)}
                className="text-gray-500 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder={'{\n  "Nombre": "mi_app",\n  "Extensión": ".html",\n  "ContentBase64": "...",\n  "Ruta a guardar": "vistas"\n}'}
                className="w-full h-48 bg-[#0f1115] border border-[#ffffff15] rounded-xl p-4 text-sm text-gray-300 font-mono focus:outline-none focus:border-orange-500/50 resize-none shadow-inner"
                spellCheck="false"
              />
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t border-[#ffffff10] bg-[#ffffff02]">
              <button
                onClick={() => setShowJsonModal(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleJsonSubmit}
                disabled={!jsonInput.trim() || loading}
                className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-semibold text-sm transition-all shadow-lg shadow-orange-500/20"
              >
                <Download className="w-4 h-4" />
                {loading ? 'Procesando...' : 'Generar y Visualizar'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
