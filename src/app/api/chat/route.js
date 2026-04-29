import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import AppFile from '@/models/AppFile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { prompt, workflow, history } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY environment variable is not defined.');
      return NextResponse.json({ error: 'Gemini API token not configured.' }, { status: 500 });
    }

    // Use Gemini 2.5 flash or a stable model depending on availability
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    // Format the system-like instruction with the workflow
    const contextPrompt = `
You are an AI assistant integrated into a Workflow Editor.
The user has designed a workflow and is asking you a question.

Here is the current workflow (compiled to Markdown):
\`\`\`markdown
${workflow}
\`\`\`

IMPORTANT: Si el usuario te pide explícitamente crear una aplicación, página web, o código (HTML/CSS/JS), DEBES responder obligatoriamente con DOS bloques de código separados. 

Primero, un bloque JSON con los metadatos (NUNCA incluyas el código HTML aquí, solo los metadatos):
\`\`\`json
{
  "Nombre": "nombre_de_la_app",
  "Extensión": ".html",
  "Ruta a guardar": "vistas"
}
\`\`\`

Segundo, un bloque de código HTML que contenga TODO el código de la aplicación (debe ser un monoarchivo con CSS y JS incrustados):
\`\`\`html
<!DOCTYPE html>
<html>
...
</html>
\`\`\`
Asegúrate de que no haya código fuera de estos bloques.

User's prompt:
${prompt}
`;

    // Format history for Gemini chat if any previous messages exist
    // Gemini chat format requires 'user' or 'model' roles
    const geminiHistory = history ? history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: msg.parts,
    })) : [];

    const chat = model.startChat({
      history: geminiHistory,
    });

    const result = await chat.sendMessage(contextPrompt);
    let responseText = result.response.text();

    // Extraer JSON metadata
    const jsonMatch = responseText.match(/\`\`\`(?:json)?\s*(\{[\s\S]*?"Nombre"[\s\S]*?\})\s*\`\`\`/i);
    // Extraer contenido HTML
    const htmlMatch = responseText.match(/\`\`\`(?:html)?\s*(<!DOCTYPE html>|<html[\s\S]*?)\`\`\`/i) || responseText.match(/\`\`\`(?:html|js|javascript|css)?\s*([\s\S]*?)\`\`\`/i);

    if (jsonMatch && htmlMatch) {
      try {
        const parsedJson = JSON.parse(jsonMatch[1]);
        const { Nombre, Extensión, "Ruta a guardar": RutaAGuardar } = parsedJson;
        
        // Excluimos el JSON si el htmlMatch agarró el bloque JSON por error
        let Content = htmlMatch[1];
        if (Content.includes('"Nombre":') && Content.includes('"Extensión":')) {
           // Fallback if the second block wasn't captured correctly
           const allBlocks = [...responseText.matchAll(/\`\`\`[a-z]*\n([\s\S]*?)\`\`\`/gi)];
           if (allBlocks.length > 1) {
             Content = allBlocks[1][1];
           }
        }

        if (Nombre && Content && !Content.includes('"Nombre":')) {
          // Limpiar ruta
          let safePath = (RutaAGuardar || 'vistas').replace(/^[\/\\]+/, '');
          if (safePath.toLowerCase().startsWith('public')) {
            safePath = safePath.substring(6).replace(/^[\/\\]+/, '');
          }

          const publicDir = path.join(process.cwd(), 'public');
          const targetPath = path.join(publicDir, safePath);

          if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
          }

          const ext = Extensión && Extensión.startsWith('.') ? Extensión : (Extensión ? `.${Extensión}` : '.html');
          const fullFilePath = path.join(targetPath, `${Nombre}${ext}`);

          // Escribir archivo directamente como utf8
          fs.writeFileSync(fullFilePath, Content, 'utf8');

          const encodedUrlPath = `${safePath ? safePath.replace(/\\/g, '/') + '/' : ''}${Nombre}${ext}`;
          const publicUrl = `/api/public/${encodedUrlPath}`;

          // Codificar a base64 para guardarlo en la DB
          const contentBase64 = Buffer.from(Content, 'utf8').toString('base64');

          // Guardar en MongoDB
          await dbConnect();
          await AppFile.create({
            userEmail: session.user.email,
            nombre: Nombre,
            extension: ext,
            contentBase64: contentBase64,
            rutaAGuardar: safePath,
            publicUrl: publicUrl
          });

          // Reemplazar los bloques por el link
          responseText = `✅ ¡Aplicación generada con éxito!\nPuedes verla aquí: [${Nombre}${ext}](${publicUrl})\nTambién estará disponible en la galería de Apps Generadas.`;
        }
      } catch (parseError) {
        console.error('Error parsing response from Gemini:', parseError);
      }
    }

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error('Error in Gemini API /api/chat:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
