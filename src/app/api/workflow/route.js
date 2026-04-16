import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import WorkflowState from '@/models/WorkflowState';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 });
    }

    await dbConnect();

    const state = await WorkflowState.findOne({ key });
    
    return NextResponse.json({ value: state ? state.value : null });
  } catch (error) {
    console.error('Error in GET /api/workflow:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { key, value } = await request.json();

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Missing key or value' }, { status: 400 });
    }

    await dbConnect();

    await WorkflowState.findOneAndUpdate(
      { key },
      { value },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/workflow:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 });
    }

    await dbConnect();
    await WorkflowState.deleteOne({ key });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/workflow:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
