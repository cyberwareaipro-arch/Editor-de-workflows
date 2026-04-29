import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AppFile from '@/models/AppFile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const apps = await AppFile.find({ userEmail: session.user.email }).sort({ createdAt: -1 });
    return NextResponse.json({ apps });
  } catch (error) {
    console.error('Error fetching apps:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
