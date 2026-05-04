'use client';
import React, { useState, useEffect } from 'react';
import { X, ExternalLink, AppWindow, Loader2, Trash2, Download } from 'lucide-react';

export default function AppGallery({ isOpen, onClose }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchApps();
    }
  }, [isOpen]);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/apps');
      const data = await res.json();
      if (data.apps) {
        setApps(data.apps);
      }
    } catch (error) {
      console.error('Error fetching apps:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta aplicación? Esto no se puede deshacer y se borrará para todos los usuarios.')) {
      try {
        const res = await fetch(`/api/apps/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchApps();
        } else {
          console.error('Error deleting app');
          alert('Hubo un error al intentar eliminar la aplicación.');
        }
      } catch (error) {
        console.error('Error deleting app:', error);
        alert('Hubo un error al intentar eliminar la aplicación.');
      }
    }
  };

  const handleDownload = (app) => {
    const link = document.createElement('a');
    link.href = `data:application/octet-stream;base64,${app.contentBase64}`;
    link.download = `${app.nombre}${app.extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-[#0f1115] border border-[#ffffff15] rounded-xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#ffffff15] bg-[#ffffff05]">
          <div className="flex items-center gap-2">
            <AppWindow className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-gray-200">Apps Generadas por IA</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : apps.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No hay aplicaciones generadas todavía. ¡Pídele a Gemini que cree una!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {apps.map((app) => (
                <div key={app._id} className="bg-[#ffffff08] border border-[#ffffff10] rounded-xl p-5 hover:border-blue-500/40 hover:bg-[#ffffff0c] transition-all flex flex-col gap-4 shadow-sm hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-200 break-all">{app.nombre}{app.extension}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(app.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleDelete(app._id)}
                      className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                      title="Eliminar aplicación"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-auto pt-2 flex gap-2">
                    <a 
                      href={app.publicUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-md transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Abrir
                    </a>
                    <button 
                      onClick={() => handleDownload(app)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600/20 text-green-400 hover:bg-green-600/30 rounded-md transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
