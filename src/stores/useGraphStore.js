import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

const hybridStorage = {
  getItem: async (name) => {
    if (typeof window === 'undefined') return null; // Avoid running on the server
    
    try {
      const res = await fetch(`/api/workflow?key=${name}`);
      if (res.ok) {
        const data = await res.json();
        if (data.value) return data.value;
      }
    } catch (err) {
      console.error('Failed to fetch from MongoDB via API', err);
    }
    // Fallback to local storage
    return localStorage.getItem(name);
  },
  setItem: async (name, value) => {
    if (typeof window === 'undefined') return; // Avoid running on the server
    
    try {
      const res = await fetch('/api/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: name, value }),
      });
      
      if (!res.ok) {
        // If not logged in (401) or other error, fallback to local storage
        localStorage.setItem(name, value);
      }
    } catch (err) {
      console.error('Failed to save to MongoDB via API', err);
      localStorage.setItem(name, value);
    }
  },
  removeItem: async (name) => {
    if (typeof window === 'undefined') return; // Avoid running on the server
    
    try {
      await fetch(`/api/workflow?key=${name}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete from MongoDB via API', err);
    }
    localStorage.removeItem(name);
  },
};

export const useGraphStore = create(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      mode: 'design', // 'design' o 'trace'
      isChatOpen: false,
      chatMessages: [],
      isAntigravityConnected: false,
      isMobileMode: false,
      activeMobilePanel: 'none', // 'none', 'skills', 'options'
      
      setIsMobileMode: (val) => set({ isMobileMode: val }),
      setActiveMobilePanel: (val) => set({ activeMobilePanel: val }),
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),
      setMode: (mode) => set({ mode }),
      setChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
      setAntigravityConnected: (isConnected) => set({ isAntigravityConnected: isConnected }),
      addChatMessage: (msg) => set({ chatMessages: [...get().chatMessages, msg] }),
      clearChat: () => set({ chatMessages: [] }),

      setGraph: (nodes, edges) => set({ nodes, edges }),
      
      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      
      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      
      onConnect: (connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },

      addNode: (node) => {
        set({
          nodes: [...get().nodes, node],
        });
      },

      addNodeInstantly: (agentData, type = 'skillNode') => {
        const { nodes } = get();
        // Base center roughly
        const baseX = window.innerWidth / 2 - 100;
        const baseY = window.innerHeight / 2 - 50;
        // Add random offset so they don't stack perfectly
        const randomOffsetX = Math.floor(Math.random() * 60) - 30;
        const randomOffsetY = Math.floor(Math.random() * 60) - 30;

        const newNode = {
          id: `${agentData.id}-${Date.now()}`,
          type,
          position: { x: baseX + randomOffsetX, y: baseY + randomOffsetY },
          data: { agent: agentData },
        };
        
        set({
          nodes: [...nodes, newNode],
        });
      },

      updateNodeData: (nodeId, data) => {
        set({
          nodes: get().nodes.map((node) => 
            node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
          )
        });
      },

      deleteNode: (nodeId) => {
        const { nodes, edges } = get();
        set({
          nodes: nodes.filter((n) => n.id !== nodeId),
          edges: edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
        });
      },

      clearAll: () => set({ nodes: [], edges: [] }),
    }),
    {
      name: 'visual-editor-graph-storage',
      storage: createJSONStorage(() => hybridStorage),
      partialize: (state) => Object.fromEntries(
        Object.entries(state).filter(([key]) => !['isMobileMode', 'activeMobilePanel'].includes(key))
      ),
    }
  )
);
