import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import AppFile from '@/models/AppFile';

export async function POST(request) {
  try {
    const data = await request.json();
    const { context, Nombre, Extensión, ContentBase64, "Ruta a guardar": RutaAGuardar, userEmail } = data;

    // Si recibimos context, lo guardamos para que Antigravity (IA) lo lea
    if (context) {
      const contextPath = path.join(process.cwd(), '.antigravity_context.md');
      fs.writeFileSync(contextPath, context, 'utf8');
      
      // Si solo viene el context emparejado sin archivo a generar
      if (!Nombre && !ContentBase64) {
        return NextResponse.json({ success: true, message: 'Context saved for Antigravity' });
      }
    }

    if (Nombre && ContentBase64) {
      const extension = Extensión || '';
      
      // Limpiamos la ruta ingresada. Si el usuario puso "public/algo", le quitamos "public/" 
      // para evitar que se guarde en public/public/algo y cause 404.
      let safePath = (RutaAGuardar || '').replace(/^[\/\\]+/, '');
      if (safePath.toLowerCase().startsWith('public')) {
        safePath = safePath.substring(6).replace(/^[\/\\]+/, '');
      }

      const publicDir = path.join(process.cwd(), 'public');
      const targetPath = path.join(publicDir, safePath);

      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }

      const ext = extension.startsWith('.') ? extension : (extension ? `.${extension}` : '');
      const fullFilePath = path.join(targetPath, `${Nombre}${ext}`);

      const fileBuffer = Buffer.from(ContentBase64, 'base64');
      fs.writeFileSync(fullFilePath, fileBuffer);

      // Utilizamos nuestra ruta dinámica asegurada /api/public/ para evitar problemas de caché 
      // del build en servidores como Render y garantizar que Next.js siempre detecte/sirva el archivo nuevo en disco.
      const encodedUrlPath = `${safePath ? safePath.replace(/\\/g, '/') + '/' : ''}${Nombre}${ext}`;
      const publicUrl = `/api/public/${encodedUrlPath}`;

      if (userEmail) {
        await dbConnect();
        await AppFile.create({
          userEmail,
          nombre: Nombre,
          extension: ext,
          contentBase64: ContentBase64,
          rutaAGuardar: safePath,
          publicUrl: publicUrl
        });
      }

      return NextResponse.json({ 

        success: true, 
        message: 'File generated successfully',
        filePath: fullFilePath,
        publicUrl: publicUrl
      });
    }

    // Soporte para formato legacy anterior
    const { file } = data;
    if (file) {
      const { name, extension, content, path: targetPathLegacy } = file;

      if (!name || extension === undefined || !content || !targetPathLegacy) {
         return NextResponse.json({ error: 'Missing required file properties' }, { status: 400 });
      }

      const resolvedDir = path.resolve(process.cwd(), targetPathLegacy);
      if (!fs.existsSync(resolvedDir)) {
        fs.mkdirSync(resolvedDir, { recursive: true });
      }

      const ext = extension.startsWith('.') ? extension : (extension ? `.${extension}` : '');
      const fullFilePath = path.join(resolvedDir, `${name}${ext}`);

      const fileBuffer = Buffer.from(content, 'base64');
      fs.writeFileSync(fullFilePath, fileBuffer);

      return NextResponse.json({ 
        success: true, 
        message: 'File generated successfully (legacy format)',
        filePath: fullFilePath
      });
    }

    return NextResponse.json({ error: 'Missing both context and file data (expected Nombre, ContentBase64, etc.)' }, { status: 400 });

  } catch (error) {
    console.error('Error saving Antigravity context / file:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
