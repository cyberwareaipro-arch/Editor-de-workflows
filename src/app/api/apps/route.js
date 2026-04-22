import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AppFile from '@/models/AppFile';

export async function GET() {
  try {
    await dbConnect();
    const apps = await AppFile.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ apps });
  } catch (error) {
    console.error('Error fetching apps:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
