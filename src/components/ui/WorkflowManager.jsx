'use client';
import React, { useState } from 'react';
import { useGraphStore } from '@/stores/useGraphStore';
import { Save, FolderOpen, Trash2, X, Play } from 'lucide-react';

export default function WorkflowManager({ isOpen, onClose }) {
  const { savedWorkflows, saveWorkflow, loadWorkflow, deleteWorkflow } = useGraphStore();
  const [newWorkflowName, setNewWorkflowName] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    saveWorkflow(newWorkflowName);
    setNewWorkflowName('');
  };

  const handleLoad = (id) => {
    loadWorkflow(id);
    onClose();
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
              <p className="text-xs text-gray-400">Guarda y carga tus flujos localmente</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
          {/* Save new workflow section */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newWorkflowName}
              onChange={(e) => setNewWorkflowName(e.target.value)}
              placeholder="Nombre del nuevo workflow..."
              className="flex-1 bg-[#0f1115] border border-[#ffffff15] rounded-lg p-2.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50"
            />
            <button
              onClick={handleSave}
              disabled={!newWorkflowName.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-semibold text-sm transition-all"
            >
              <Save className="w-4 h-4" />
              Guardar
            </button>
          </div>

          {/* List of saved workflows */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Workflows Guardados ({savedWorkflows?.length || 0})</h4>
            {(!savedWorkflows || savedWorkflows.length === 0) ? (
              <div className="text-center p-8 border border-dashed border-[#ffffff10] rounded-xl text-gray-500 text-sm">
                No hay workflows guardados aún.
              </div>
            ) : (
              savedWorkflows.map((wf) => (
                <div key={wf.id} className="flex items-center justify-between p-3 bg-[#ffffff05] border border-[#ffffff10] rounded-xl hover:bg-[#ffffff0a] transition-colors">
                  <div>
                    <h5 className="font-semibold text-gray-200">{wf.name}</h5>
                    <p className="text-xs text-gray-500">
                      {new Date(wf.updatedAt).toLocaleString()} • {wf.nodes.length} nodos
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLoad(wf.id)}
                      className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors tooltip-trigger"
                      title="Cargar este workflow"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteWorkflow(wf.id)}
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
