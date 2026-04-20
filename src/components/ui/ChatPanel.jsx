'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useGraphStore } from '@/stores/useGraphStore';
import { Bot, Send, User, X, Loader2, Trash2 } from 'lucide-react';
import { compileWorkflow } from '@/actions/compileWorkflow';

export default function ChatPanel() {
  const { isChatOpen, setChatOpen, chatMessages, addChatMessage, clearChat, nodes, edges } = useGraphStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  if (!isChatOpen) return null;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    addChatMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      // Compilar workflow para dar contexto
      const compileRes = await compileWorkflow(nodes, edges);
      const workflowContext = compileRes.success ? compileRes.md : 'No workflow compiled';

      // Llamar a nuestra API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMessage.content,
          workflow: workflowContext,
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
             placeholder="Prompt Gemini..."
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
