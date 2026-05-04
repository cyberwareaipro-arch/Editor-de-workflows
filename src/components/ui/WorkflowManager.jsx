'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useGraphStore } from '@/stores/useGraphStore';
import { Save, FolderOpen, Trash2, X, Play, Download, Upload, Loader2 } from 'lucide-react';

export default function WorkflowManager({ isOpen, onClose }) {
  const { nodes, edges, setGraph } = useGraphStore();
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [savedWorkflows, setSavedWorkflows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchWorkflows();
    }
  }, [isOpen]);

  const fetchWorkflows = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/workflows');
      if (res.ok) {
        const data = await res.json();
        setSavedWorkflows(data.workflows || []);
      }
    } catch (error) {
      console.error('Error fetching workflows:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!newWorkflowName.trim()) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newWorkflowName, nodes, edges }),
      });
      if (res.ok) {
        setNewWorkflowName('');
        await fetchWorkflows();
      } else {
        console.error('Failed to save workflow');
      }
    } catch (error) {
      console.error('Error saving workflow:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoad = async (id) => {
    try {
      const res = await fetch(`/api/workflows/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.workflow) {
          setGraph(data.workflow.nodes, data.workflow.edges);
          onClose();
        }
      }
    } catch (error) {
      console.error('Error loading workflow:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este workflow?')) return;
    try {
      const res = await fetch(`/api/workflows/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchWorkflows();
      }
    } catch (error) {
      console.error('Error deleting workflow:', error);
    }
  };

  const handleExport = async (wf) => {
    try {
      const res = await fetch(`/api/workflows/${wf._id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.workflow) {
          const blob = new Blob([JSON.stringify({
            name: data.workflow.name,
            nodes: data.workflow.nodes,
            edges: data.workflow.edges
          }, null, 2)], { type: 'application/json' });
          
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${data.workflow.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }
    } catch (error) {
      console.error('Error exporting workflow:', error);
    }
  };

  const handleExportCurrent = () => {
    const name = newWorkflowName.trim() || 'workflow';
    const blob = new Blob([JSON.stringify({
      name,
      nodes,
      edges
    }, null, 2)], { type: 'application/json' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (json.nodes && json.edges) {
          setGraph(json.nodes, json.edges);
          if (json.name) {
            setNewWorkflowName(json.name);
          }
          onClose();
        } else {
          alert('El archivo no tiene el formato correcto de un workflow.');
        }
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1a1d24] border border-[#ffffff15] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col transform transition-all scale-100">
        
        <div className="flex items-center justify-between p-4 border-b border-[#ffffff10] bg-[#ffffff05]">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <FolderOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-100">Gestor de Workflows</h3>
              <p className="text-xs text-gray-400">Guarda, carga, importa y exporta flujos</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
          {/* Controls section */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newWorkflowName}
                onChange={(e) => setNewWorkflowName(e.target.value)}
                placeholder="Nombre del flujo actual..."
                className="flex-1 bg-[#0f1115] border border-[#ffffff15] rounded-lg p-2.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50"
              />
              <button
                onClick={handleSave}
                disabled={!newWorkflowName.trim() || isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-semibold text-sm transition-all"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Guardar
              </button>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleExportCurrent}
                className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-[#ffffff05] hover:bg-[#ffffff10] border border-[#ffffff15] text-gray-300 rounded-lg text-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Exportar Actual
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-[#ffffff05] hover:bg-[#ffffff10] border border-[#ffffff15] text-gray-300 rounded-lg text-sm transition-all"
              >
                <Upload className="w-4 h-4" />
                Importar JSON
              </button>
              <input 
                type="file" 
                accept=".json" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleImport} 
              />
            </div>
          </div>

          {/* List of saved workflows */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Workflows Guardados ({savedWorkflows.length})</h4>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
              </div>
            ) : savedWorkflows.length === 0 ? (
              <div className="text-center p-8 border border-dashed border-[#ffffff10] rounded-xl text-gray-500 text-sm">
                No hay workflows guardados aún.
              </div>
            ) : (
              savedWorkflows.map((wf) => (
                <div key={wf._id} className="flex items-center justify-between p-3 bg-[#ffffff05] border border-[#ffffff10] rounded-xl hover:bg-[#ffffff0a] transition-colors">
                  <div>
                    <h5 className="font-semibold text-gray-200">{wf.name}</h5>
                    <p className="text-xs text-gray-500">
                      {new Date(wf.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLoad(wf._id)}
                      className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors tooltip-trigger"
                      title="Cargar este workflow"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleExport(wf)}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors tooltip-trigger"
                      title="Descargar JSON"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(wf._id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors tooltip-trigger"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
