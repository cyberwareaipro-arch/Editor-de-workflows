import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Workflow from '@/models/Workflow';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const { id } = await params;
    const workflow = await Workflow.findOne({ _id: id, userEmail: session.user.email });

    if (!workflow) {
      return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
    }

    return NextResponse.json({ workflow });
  } catch (error) {
    console.error('Error fetching workflow:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const { id } = await params;
    const deletedWorkflow = await Workflow.findOneAndDelete({ _id: id, userEmail: session.user.email });

    if (!deletedWorkflow) {
      return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting workflow:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
