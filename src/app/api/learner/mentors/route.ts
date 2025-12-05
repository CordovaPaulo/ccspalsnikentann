import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const EXTERNAL_API_KEY = process.env.MINDMATE_EXTERNAL_API_KEY;
const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL;

export async function GET(request: NextRequest) {
  try {
    if (!EXTERNAL_API_KEY) {
      return NextResponse.json(
        { error: 'External API configuration missing' },
        { status: 500 }
      );
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const modality = searchParams.get('modality');
    const availability = searchParams.get('availability');

    // Fetch mentors from external API
    const response = await axios.get(`${EXTERNAL_API_URL}/mentors`, {
      headers: {
        'X-API-KEY': `${EXTERNAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      params: {
        ...(subject && { subject }),
        ...(modality && { modality }),
        ...(availability && { availability })
      }
    });

    return NextResponse.json({
      mentors: response.data.mentors || response.data,
      total: response.data.total || response.data.length
    });

  } catch (error: any) {
    console.error('Fetch mentors error:', error);
    
    // Return empty array instead of error if external API fails
    // This allows the app to continue functioning
    if (error.response?.status === 404 || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return NextResponse.json({
        mentors: [],
        total: 0,
        message: 'External mentor service unavailable'
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch mentors' },
      { status: 500 }
    );
  }
}
