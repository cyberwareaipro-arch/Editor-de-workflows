import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    // En Next.js 15+ los params son asíncronos y DEBEN esperarse con await
    const resolvedParams = await params;
    const slug = resolvedParams?.slug || [];
    // Evitar directory traversal
    if (slug.some(part => part.includes('..') || part.includes('~'))) {
      return new NextResponse('Invalid path', { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', ...slug);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    // Determinar el MIME type básico para que el navegador lo renderice (html, css, js)
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.html') contentType = 'text/html; charset=utf-8';
    else if (ext === '.css') contentType = 'text/css; charset=utf-8';
    else if (ext === '.js' || ext === '.mjs') contentType = 'application/javascript; charset=utf-8';
    else if (ext === '.json') contentType = 'application/json; charset=utf-8';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.txt' || ext === '.md') contentType = 'text/plain; charset=utf-8';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        // Evitar caché para que los cambios se reflejen inmediatamente
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err) {
    console.error('Error serving dynamic public file:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
