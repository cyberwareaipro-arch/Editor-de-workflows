'use server';

export async function compileWorkflow(nodes, edges) {
  if (!nodes || nodes.length === 0) {
    return { success: false, error: "The workflow is empty. Add some skills first." };
  }

  // 1. Build Adjacency List and In-Degree Map
  const adj = new Map();
  const inDegree = new Map();
  const nodeMap = new Map();

  nodes.forEach(node => {
    adj.set(node.id, []);
    inDegree.set(node.id, 0);
    nodeMap.set(node.id, node);
  });

  edges.forEach(edge => {
    if (adj.has(edge.source) && adj.has(edge.target)) {
      adj.get(edge.source).push(edge.target);
      inDegree.set(edge.target, inDegree.get(edge.target) + 1);
    }
  });

  // 2. Kahn's Algorithm for Topological Sort
  const queue = [];
  const sortedNodes = [];

  for (const [nodeId, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(nodeId);
    }
  }

  while (queue.length > 0) {
    const currentId = queue.shift();
    sortedNodes.push(currentId);

    const neighbors = adj.get(currentId) || [];
    for (const neighborId of neighbors) {
      const currentDegree = inDegree.get(neighborId);
      inDegree.set(neighborId, currentDegree - 1);
      if (inDegree.get(neighborId) === 0) {
        queue.push(neighborId);
      }
    }
  }

  // 3. Pre-flight Validation (Cycle Detection)
  if (sortedNodes.length !== nodes.length) {
    return { 
      success: false, 
      error: "Pre-flight Validation Failed: Cycle detected. A directed cyclic graph cannot be compiled sequentially." 
    };
  }

  // 4. Generate Semantic Markdown
  let mdOutput = `# Orquestación de Agentes\n\n`;
  mdOutput += `Generado automáticamente por el AI Workflow Editor.\n\n`;
  
  mdOutput += `## Secuencia de Ejecución\n\n`;

  sortedNodes.forEach((nodeId, index) => {
    const node = nodeMap.get(nodeId);
    
    if (node.type === 'conditionNode') {
       mdOutput += `### Paso ${index + 1}: Evaluación Condicional Lógica\n`;
       mdOutput += `- **Nodo:** If / Else Condition\n`;
       mdOutput += `- **Resolución:** Emite output divergente hacia ambas ramas posibles.\n\n`;
    } else {
       const agentName = node.data?.agent?.name || 'Agente Desconocido';
       mdOutput += `### Paso ${index + 1}: ${agentName}\n`;
       if (node.data?.customPrompt) {
         mdOutput += `> **Directiva Personalizada:** ${node.data.customPrompt}\n\n`;
       } else {
         mdOutput += `> *Ejecutar con el prompt estándar del agente.*\n\n`;
       }
    }
  });

  return { success: true, md: mdOutput };
}
