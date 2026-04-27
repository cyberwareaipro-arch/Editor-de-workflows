'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useGraphStore } from '@/stores/useGraphStore';
import { Bot, Send, User, X, Loader2, Trash2, FileJson } from 'lucide-react';
import { compileWorkflow } from '@/actions/compileWorkflow';

export default function ChatPanel() {
  const { isChatOpen, setChatOpen, chatMessages, addChatMessage, clearChat, nodes, edges, savedWorkflows } = useGraphStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState('current');  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  if (!isChatOpen) return null;

  const handleSend = async () => {
    const finalInput = input.trim();
    if (!finalInput) return;

    let selectedNodes = nodes;
    let selectedEdges = edges;
    let workflowName = "Workflow Actual";

    if (selectedWorkflowId !== 'current') {
      const wf = savedWorkflows.find(w => w.id === selectedWorkflowId);
      if (wf) {
        selectedNodes = wf.nodes;
        selectedEdges = wf.edges;
        workflowName = wf.name;
      }
    }

    if (!selectedNodes || selectedNodes.length === 0) {
      alert('El workflow seleccionado está vacío');
      return;
    }

    const rawData = JSON.stringify({ nodes: selectedNodes, edges: selectedEdges }, null, 2);

    const userMessage = { 
      role: 'user', 
      content: finalInput,
      attachedFile: `${workflowName.replace(/\s+/g, '_')}.json`
    };
    
    addChatMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const compileRes = await compileWorkflow(selectedNodes, selectedEdges);
      const workflowContext = compileRes.success ? compileRes.md : 'No workflow compiled';
      
      const fullWorkflowData = `## Markdown Context\n${workflowContext}\n\n## Archivo Adjunto (Estructura RAW JSON)\n\`\`\`json\n${rawData}\n\`\`\``;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMessage.content,
          workflow: fullWorkflowData,
          history: chatMessages.map(m => ({ role: m.role, parts: [{ text: m.content }] })) // History for Gemini
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch response');

      addChatMessage({ role: 'assistant', content: data.text });
    } catch (error) {
      addChatMessage({ role: 'assistant', content: `Error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-20 right-4 w-96 max-h-[80vh] bg-[#0f1115]/95 backdrop-blur-xl border border-[#ffffff15] rounded-xl flex flex-col z-50 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-[#ffffff15] bg-[#ffffff05]">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-400" />
          <h3 className="text-sm font-bold text-gray-200">Gemini Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearChat} className="text-gray-500 hover:text-red-400 transition-colors" title="Clear chat">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 min-h-[300px]">
        {chatMessages.length === 0 ? (
          <div className="text-center text-gray-500 text-xs mt-10">
            Send a prompt to Gemini about your current workflow.
          </div>
        ) : (
          chatMessages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-3 rounded-lg text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-500/10 text-blue-100 border border-blue-500/20' : 'bg-[#ffffff08] text-gray-300 border border-[#ffffff10]'}`}>
                {msg.attachedFile && (
                  <div className="flex items-center gap-2 mb-2 p-2 bg-black/20 rounded border border-blue-500/30 text-blue-300">
                    <FileJson className="w-4 h-4" />
                    <span className="font-mono text-xs">{msg.attachedFile}</span>
                  </div>
                )}
                {msg.content}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-lg bg-[#ffffff08] text-gray-300 border border-[#ffffff10] flex items-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#ffffff15] bg-[#ffffff02]">
        <div className="flex justify-between items-center mb-2 px-1">
           <div className="flex items-center gap-2">
             <FileJson className="w-4 h-4 text-gray-400" />
             <span className="text-xs text-gray-400 font-medium">Adjuntar:</span>
             <select
               value={selectedWorkflowId}
               onChange={(e) => setSelectedWorkflowId(e.target.value)}
               className="bg-[#ffffff0a] border border-[#ffffff15] text-xs text-blue-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500/50"
             >
               <option value="current">Workflow Actual</option>
               {savedWorkflows?.map(wf => (
                 <option key={wf.id} value={wf.id}>{wf.name}</option>
               ))}
             </select>
           </div>
        </div>
        <div className="relative">
          <textarea
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => {
               if (e.key === 'Enter' && !e.shiftKey) {
                 e.preventDefault();
                 handleSend();
               }
             }}
             placeholder="Escribe tu prompt e instrucciones aquí..."
             className="w-full bg-[#ffffff0a] border border-[#ffffff15] rounded-lg pl-3 pr-10 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500/50 resize-none min-h-[44px] max-h-[120px]"
             rows={1}
          />
          <button 
             onClick={handleSend}
             disabled={!input.trim() || loading}
             className="absolute right-2 bottom-2 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-md transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
