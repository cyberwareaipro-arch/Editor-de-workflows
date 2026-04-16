'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getAgents() {
  const agentsDir = path.join(process.cwd(), '.agents');
  
  if (!fs.existsSync(agentsDir)) {
    return [];
  }

  const files = fs.readdirSync(agentsDir);
  const agents = [];

  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(agentsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      const { data, content } = matter(fileContent);
      
      // Determine category based on frontmatter or filename as a simple heuristic
      let category = data.category || 'Other';
      
      if (!data.category) {
        const lowercaseName = (data.name || file).toLowerCase();
        if (lowercaseName.includes('test') || lowercaseName.includes('qa')) category = 'Testing & QA';
        else if (lowercaseName.includes('secur') || lowercaseName.includes('guard')) category = 'Security';
        else if (lowercaseName.includes('architect') || lowercaseName.includes('design')) category = 'Architecture & Design';
        else if (lowercaseName.includes('plan') || lowercaseName.includes('requirement')) category = 'Planning';
        else if (lowercaseName.includes('code') || lowercaseName.includes('ui')) category = 'Implementation';
        else if (lowercaseName.includes('publish') || lowercaseName.includes('deploy') || lowercaseName.includes('uploader') || lowercaseName.includes('google-play') || lowercaseName.includes('release')) category = 'Deployment';
      }

      agents.push({
        id: file.replace('.md', ''),
        name: data.name || file.replace('.md', ''),
        description: data.description || 'No description provided.',
        category,
        content: content.slice(0, 500) // snippet for preview
      });
    }
  }

  // Sort alphabetically
  return agents.sort((a, b) => a.name.localeCompare(b.name));
}
