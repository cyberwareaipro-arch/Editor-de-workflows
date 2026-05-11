'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import connectMongo from '@/lib/mongodb';
import Skill from '@/models/Skill';

export async function getAgents() {
  const agentsDir = path.join(process.cwd(), '.agents');
  const agents = [];
  
  if (fs.existsSync(agentsDir)) {
    const files = fs.readdirSync(agentsDir);

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
          content: content.slice(0, 500), // snippet for preview
          isDefault: true
        });
      }
    }
  }

  // Fetch DB skills
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.email) {
      await connectMongo();
      const customSkills = await Skill.find({
        $or: [
          { userEmail: session.user.email },
          { isShared: true }
        ]
      });

      for (const skill of customSkills) {
        let name = skill.name;
        // Agregamos [Importado] si es de otro usuario y es compartido
        if (skill.userEmail !== session.user.email && skill.isShared && !name.startsWith('[Importado]')) {
          name = `[Importado] ${name}`;
        }
        
        agents.push({
          id: skill.customId,
          name: name,
          description: skill.description,
          category: skill.category,
          content: skill.content, // For custom skills, we can send the whole content or slice it if needed. Let's send the whole thing since it's smaller than a big markdown.
          isDefault: false,
          isShared: skill.isShared,
          userEmail: skill.userEmail
        });
      }
    }
  } catch (error) {
    console.error('Error fetching custom skills in getAgents:', error);
  }

  // Sort alphabetically
  return agents.sort((a, b) => a.name.localeCompare(b.name));
}
