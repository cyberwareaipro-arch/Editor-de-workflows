import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

export const useGraphStore = create(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      mode: 'design', // 'design' o 'trace'
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),
      setMode: (mode) => set({ mode }),
      
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
    }
  )
);
