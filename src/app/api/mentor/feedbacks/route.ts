import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Feedback from '@/models/Feedback';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ccspals-default-secret-change-in-production';

// Helper to verify JWT and extract user info
function verifyToken(request: NextRequest) {
  const token = request.cookies.get('MindMateToken')?.value || 
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

// GET - Mentor reads all feedback they've received
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { userId, role } = verifyToken(request);
    
    // Only mentors can view their feedback
    if (role !== 'mentor') {
      return NextResponse.json(
        { error: 'Only mentors can view feedback' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const rating = searchParams.get('rating');
    const subject = searchParams.get('subject');

    // Build query
    const query: any = { mentorId: userId };
    if (rating) {
      query.rating = parseInt(rating);
    }
    if (subject) {
      query.subject = subject;
    }

    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 });

    // Calculate average rating
    const averageRating = feedbacks.length > 0
      ? feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length
      : 0;

    return NextResponse.json({
      feedbacks,
      total: feedbacks.length,
      averageRating: Math.round(averageRating * 10) / 10
    });

  } catch (error: any) {
    console.error('Get mentor feedbacks error:', error);
    
    if (error.message === 'Authentication required' || error.message === 'Invalid token') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    );
  }
}
