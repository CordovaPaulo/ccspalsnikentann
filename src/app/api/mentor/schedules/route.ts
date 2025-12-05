import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Schedule from '@/models/Schedule';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ccspals-default-secret-change-in-production';

// Helper to verify JWT and extract user info
function verifyToken(request: NextRequest) {
  const token = request.cookies.get('mindmate_token')?.value || 
                request.cookies.get('MindMateToken')?.value ||
                request.headers.get('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// GET - Fetch schedules for mentor
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { userId } = verifyToken(request);
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const query: any = { mentorId: userId };
    if (status) {
      query.status = status;
    }

    const schedules = await Schedule.find(query).sort({ date: -1, time: -1 });

    return NextResponse.json({
      schedules,
      total: schedules.length
    });

  } catch (error: any) {
    console.error('Get mentor schedules error:', error);
    
    if (error.message === 'Authentication required' || error.message === 'Invalid token') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch schedules' },
      { status: 500 }
    );
  }
}
