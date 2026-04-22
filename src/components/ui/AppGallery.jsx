'use client';
import React, { useState, useEffect } from 'react';
import { X, ExternalLink, AppWindow, Loader2 } from 'lucide-react';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0f1115] border border-[#ffffff15] rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {apps.map((app) => (
                <div key={app._id} className="bg-[#ffffff08] border border-[#ffffff10] rounded-lg p-4 hover:border-blue-500/30 transition-colors flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-200 break-all">{app.nombre}{app.extension}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(app.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto pt-2">
                    <a 
                      href={app.publicUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-md transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Abrir Aplicación
                    </a>
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
