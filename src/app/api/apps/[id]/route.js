import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AppFile from '@/models/AppFile';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    
    await dbConnect();
    
    const appFile = await AppFile.findById(id);
    if (!appFile) {
      return NextResponse.json({ error: 'App not found' }, { status: 404 });
    }

    if (appFile.userEmail !== session.user.email) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Attempt to delete physical file
    try {
      const publicDir = path.join(process.cwd(), 'public');
      const safePath = appFile.rutaAGuardar || '';
      const fullFilePath = path.join(publicDir, safePath, `${appFile.nombre}${appFile.extension}`);
      
      if (fs.existsSync(fullFilePath)) {
        fs.unlinkSync(fullFilePath);
      }
    } catch (fsError) {
      console.error('Failed to delete physical file:', fsError);
      // We continue to delete the DB record even if file deletion fails
    }

    await AppFile.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'App deleted successfully' });
  } catch (error) {
    console.error('Error deleting app:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
