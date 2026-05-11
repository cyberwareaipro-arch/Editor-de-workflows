'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { X, Bot, Plus, Trash2, Edit, Save, Share2, Globe, Lock } from 'lucide-react';

export default function SkillManager({ isOpen, onClose }) {
  const { data: session } = useSession();
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({
    name: '',
    description: '',
    category: 'Other',
    content: '',
    isShared: false
  });

  useEffect(() => {
    if (isOpen) {
      fetchSkills();
    }
  }, [isOpen]);

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/skills');
      if (res.ok) {
        const data = await res.json();
        setSkills(data.skills || []);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentSkill.name || !currentSkill.description || !currentSkill.content) {
      alert('Nombre, descripción y prompt son requeridos.');
      return;
    }
    
    setIsLoading(true);
    try {
      const url = currentSkill._id ? `/api/skills/${currentSkill._id}` : '/api/skills';
      const method = currentSkill._id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSkill)
      });
      
      if (res.ok) {
        setIsEditing(false);
        setCurrentSkill({ name: '', description: '', category: 'Other', content: '', isShared: false });
        await fetchSkills();
        // Disparamos un evento para que Sidebar sepa que debe recargar (podemos manejarlo recargando o usando un context, de momento un window reload o que el usuario refresque, pero idealmente Sidebar deberia escuchar un evento o tener una función pasada)
        window.dispatchEvent(new Event('skillsUpdated'));
      } else {
        const data = await res.json();
        alert(data.error || 'Error saving skill');
      }
    } catch (error) {
      console.error('Error saving skill:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este skill personalizado?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchSkills();
        window.dispatchEvent(new Event('skillsUpdated'));
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1a1d24] border border-[#ffffff15] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all scale-100">
        
        <div className="flex items-center justify-between p-4 border-b border-[#ffffff10] bg-[#ffffff05]">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-100">Gestor de Custom Skills</h3>
              <p className="text-xs text-gray-400">Crea y comparte agentes personalizados</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar list */}
          <div className="w-1/3 border-r border-[#ffffff10] flex flex-col bg-[#0f1115]/50">
            <div className="p-3 border-b border-[#ffffff10]">
              <button
                onClick={() => {
                  setCurrentSkill({ name: '', description: '', category: 'Other', content: '', isShared: false });
                  setIsEditing(true);
                }}
                className="w-full flex justify-center items-center gap-2 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" /> Nuevo Skill
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
              {isLoading && skills.length === 0 ? (
                <div className="text-center p-4 text-gray-500 text-sm">Cargando...</div>
              ) : skills.length === 0 ? (
                <div className="text-center p-4 text-gray-500 text-sm">No tienes skills personalizados.</div>
              ) : (
                skills.map(skill => (
                  <div 
                    key={skill._id} 
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${currentSkill._id === skill._id ? 'bg-[#ffffff10] border-purple-500/50' : 'bg-[#ffffff05] border-[#ffffff10] hover:bg-[#ffffff0a]'}`}
                    onClick={() => {
                      setCurrentSkill(skill);
                      setIsEditing(true);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-200 text-sm line-clamp-1">{skill.name}</h4>
                      {skill.isShared ? <Globe className="w-3 h-3 text-blue-400" title="Compartido" /> : <Lock className="w-3 h-3 text-gray-500" title="Privado" />}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{skill.description}</p>
                    {skill.userEmail !== session?.user?.email && (
                      <span className="text-[10px] text-orange-400 mt-2 block">Creado por otro usuario</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
            {isEditing ? (
              <>
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-400">Nombre</label>
                    <input
                      type="text"
                      value={currentSkill.name}
                      onChange={e => setCurrentSkill({...currentSkill, name: e.target.value})}
                      disabled={currentSkill.userEmail && currentSkill.userEmail !== session?.user?.email}
                      className="bg-[#0f1115] border border-[#ffffff15] rounded-lg p-2.5 text-sm text-gray-300 focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
                      placeholder="Ej: Asistente Legal"
                    />
                  </div>
                  <div className="w-1/3 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-400">Categoría</label>
                    <select
                      value={currentSkill.category}
                      onChange={e => setCurrentSkill({...currentSkill, category: e.target.value})}
                      disabled={currentSkill.userEmail && currentSkill.userEmail !== session?.user?.email}
                      className="bg-[#0f1115] border border-[#ffffff15] rounded-lg p-2.5 text-sm text-gray-300 focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
                    >
                      <option value="Security">Security</option>
                      <option value="Architecture & Design">Architecture & Design</option>
                      <option value="Planning">Planning</option>
                      <option value="Implementation">Implementation</option>
                      <option value="Testing & QA">Testing & QA</option>
                      <option value="Deployment">Deployment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-400">Descripción breve</label>
                  <input
                    type="text"
                    value={currentSkill.description}
                    onChange={e => setCurrentSkill({...currentSkill, description: e.target.value})}
                    disabled={currentSkill.userEmail && currentSkill.userEmail !== session?.user?.email}
                    className="bg-[#0f1115] border border-[#ffffff15] rounded-lg p-2.5 text-sm text-gray-300 focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
                    placeholder="Describe qué hace este agente"
                  />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-xs font-semibold text-gray-400">System Prompt (Directiva Principal)</label>
                  <textarea
                    value={currentSkill.content}
                    onChange={e => setCurrentSkill({...currentSkill, content: e.target.value})}
                    disabled={currentSkill.userEmail && currentSkill.userEmail !== session?.user?.email}
                    className="bg-[#0f1115] border border-[#ffffff15] rounded-lg p-3 text-sm text-gray-300 font-mono h-40 resize-none focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
                    placeholder="Eres un agente especializado en..."
                  />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="isShared"
                    checked={currentSkill.isShared}
                    onChange={e => setCurrentSkill({...currentSkill, isShared: e.target.checked})}
                    disabled={currentSkill.userEmail && currentSkill.userEmail !== session?.user?.email}
                    className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-purple-600 focus:ring-purple-600 focus:ring-offset-gray-900"
                  />
                  <label htmlFor="isShared" className="text-sm text-gray-300 flex items-center gap-1 cursor-pointer">
                    Compartir este skill publicamente <Globe className="w-3 h-3 ml-1 text-gray-400"/>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#ffffff10] mt-auto">
                  {currentSkill._id && (!currentSkill.userEmail || currentSkill.userEmail === session?.user?.email) && (
                    <button
                      onClick={() => handleDelete(currentSkill._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded-lg font-semibold text-sm transition-all mr-auto"
                    >
                      <Trash2 className="w-4 h-4" /> Eliminar
                    </button>
                  )}
                  
                  {(!currentSkill.userEmail || currentSkill.userEmail === session?.user?.email) && (
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold text-sm transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" /> {isLoading ? 'Guardando...' : 'Guardar Skill'}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-3">
                <Bot className="w-12 h-12 opacity-20" />
                <p>Selecciona un skill o crea uno nuevo</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
