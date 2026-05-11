import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import connectMongo from '@/lib/mongodb';
import Skill from '@/models/Skill';
import crypto from 'crypto';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongo();

    // Obtener los skills del usuario y los que sean compartidos (isShared: true)
    const userEmail = session.user.email;
    const skills = await Skill.find({
      $or: [
        { userEmail: userEmail },
        { isShared: true }
      ]
    }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ error: 'Error fetching skills' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, category, content, isShared, customId } = body;

    if (!name || !description || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectMongo();

    let finalCustomId = customId;
    if (finalCustomId) {
      // Check if it already exists for this user
      const existing = await Skill.findOne({ customId: finalCustomId, userEmail: session.user.email });
      if (existing) {
        return NextResponse.json({ success: true, skill: existing, alreadyExisted: true });
      }
      // Modificamos el customId para evitar colisiones globales si fuera necesario, 
      // pero en este caso lo mantenemos o agregamos algo si no existe para este usuario
      // para asegurar unicidad global que exige Mongoose en el campo customId si es que es único global.
      // Wait, is customId unique global? Yes, we made it unique: true in Skill.js.
      // So if a user imports a skill from another user, using the SAME customId will violate the global unique constraint.
      // So we should generate a new customId for the importer, or change the schema to make { customId, userEmail } unique together.
      // To keep it simple, if it's an import, generate a new customId!
      finalCustomId = `custom-${crypto.randomBytes(4).toString('hex')}-${Date.now()}`;
    } else {
      finalCustomId = `custom-${crypto.randomBytes(4).toString('hex')}-${Date.now()}`;
    }

    // Si viene con prefijo, asegurarnos de que lo tenga, el plan dice agregar [Importado]
    let finalName = name;
    if (customId && !finalName.startsWith('[Importado]')) {
      finalName = `[Importado] ${finalName}`;
    }

    const newSkill = await Skill.create({
      userEmail: session.user.email,
      name: finalName,
      description,
      category: category || 'Other',
      content,
      isShared: isShared || false,
      customId: finalCustomId
    });

    return NextResponse.json({ success: true, skill: newSkill });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json({ error: 'Error creating skill' }, { status: 500 });
  }
}
