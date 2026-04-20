import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error('Error in Gemini API /api/chat:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
