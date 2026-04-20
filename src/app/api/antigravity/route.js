import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { context } = await request.json();

    if (!context) {
      return NextResponse.json({ error: 'Missing context' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), '.antigravity_context.md');
    fs.writeFileSync(filePath, context, 'utf8');

    return NextResponse.json({ success: true, message: 'Context saved for Antigravity' });
  } catch (error) {
    console.error('Error saving Antigravity context:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
