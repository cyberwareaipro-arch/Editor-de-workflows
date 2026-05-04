import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Workflow from '@/models/Workflow';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const workflows = await Workflow.find({ userEmail: session.user.email }).sort({ updatedAt: -1 });
    
    // We can omit nodes and edges for the list view to reduce payload size, 
    // but since they are small, it's fine for now. If needed, use .select('-nodes -edges')
    return NextResponse.json({ workflows });
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, nodes, edges } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Missing workflow name' }, { status: 400 });
    }

    await dbConnect();

    const newWorkflow = new Workflow({
      userEmail: session.user.email,
      name,
      nodes: nodes || [],
      edges: edges || [],
    });

    await newWorkflow.save();

    return NextResponse.json({ workflow: newWorkflow }, { status: 201 });
  } catch (error) {
    console.error('Error creating workflow:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
