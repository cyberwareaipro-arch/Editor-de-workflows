import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import AppFile from '@/models/AppFile';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
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

IMPORTANT: Si el usuario te pide explícitamente crear una aplicación, página web, o código (HTML/CSS/JS), DEBES responder obligatoriamente con un único bloque JSON que siga exactamente esta estructura, codificando el contenido del código (todo integrado en un único archivo) en base64:
\`\`\`json
{
  "Nombre": "nombre_de_la_app",
  "Extensión": ".html",
  "ContentBase64": "...",
  "Ruta a guardar": "vistas"
}
\`\`\`
Asegúrate de que todo el código sea un monoarchivo (HTML con CSS y JS incrustados). No incluyas otros bloques de código, solo el bloque JSON.

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

    // Check if response contains a JSON block with the specified format
    const jsonMatch = responseText.match(/```json\s*(\{[\s\S]*?"Nombre"[\s\S]*?"ContentBase64"[\s\S]*?\})\s*```/);
    if (jsonMatch) {
      try {
        const parsedJson = JSON.parse(jsonMatch[1]);
        const { Nombre, Extensión, ContentBase64, "Ruta a guardar": RutaAGuardar } = parsedJson;

        if (Nombre && ContentBase64) {
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

          const fileBuffer = Buffer.from(ContentBase64, 'base64');
          fs.writeFileSync(fullFilePath, fileBuffer);

          const encodedUrlPath = `${safePath ? safePath.replace(/\\/g, '/') + '/' : ''}${Nombre}${ext}`;
          const publicUrl = `/api/public/${encodedUrlPath}`;

          // Guardar en MongoDB
          await dbConnect();
          await AppFile.create({
            nombre: Nombre,
            extension: ext,
            contentBase64: ContentBase64,
            rutaAGuardar: safePath,
            publicUrl: publicUrl
          });

          // Reemplazar el bloque JSON gigante por un mensaje amistoso y un link
          responseText = responseText.replace(
            jsonMatch[0], 
            `\n\n✅ ¡Aplicación generada con éxito!\nPuedes verla aquí: [${Nombre}${ext}](${publicUrl})\nTambién estará disponible en la galería de Apps Generadas.\n`
          );
        }
      } catch (parseError) {
        console.error('Error parsing JSON from Gemini:', parseError);
      }
    }

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error('Error in Gemini API /api/chat:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
