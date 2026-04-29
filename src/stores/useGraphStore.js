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
      savedWorkflows: [],
      selectedNodeId: null,
      mode: 'design', // 'design' o 'trace'
      isChatOpen: false,
      chatMessages: [],
      isAntigravityConnected: false,
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),
      setMode: (mode) => set({ mode }),
      setChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
      setAntigravityConnected: (isConnected) => set({ isAntigravityConnected: isConnected }),
      addChatMessage: (msg) => set({ chatMessages: [...get().chatMessages, msg] }),
      clearChat: () => set({ chatMessages: [] }),

      saveWorkflow: (name) => {
        const { nodes, edges, savedWorkflows } = get();
        const newWorkflow = {
          id: Date.now().toString(),
          name: name || `Workflow ${new Date().toLocaleString()}`,
          nodes,
          edges,
          updatedAt: Date.now()
        };
        set({ savedWorkflows: [...(savedWorkflows || []), newWorkflow] });
      },
      loadWorkflow: (id) => {
        const { savedWorkflows } = get();
        const workflow = (savedWorkflows || []).find(w => w.id === id);
        if (workflow) {
          set({ nodes: workflow.nodes, edges: workflow.edges });
        }
      },
      deleteWorkflow: (id) => {
        const { savedWorkflows } = get();
        set({ savedWorkflows: (savedWorkflows || []).filter(w => w.id !== id) });
      },
      
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
    }
  )
);
